/**
 * PCM Audio Worklet Processor
 *
 * Converts Float32 audio from microphone to 16-bit PCM format
 * and sends it in 20ms chunks (320 samples at 16kHz) for low-latency streaming.
 *
 * This runs in the Audio Worklet thread (separate from main thread)
 * for optimal real-time audio processing performance.
 */

class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    // Buffer to collect 20ms chunks (320 samples at 16kHz)
    this.chunkSize = 320; // 16000 Hz * 0.02s = 320 samples
    this.buffer = new Float32Array(this.chunkSize);
    this.bufferIndex = 0;
  }

  /**
   * Convert Float32 audio samples to 16-bit PCM
   * @param {Float32Array} float32Array - Audio samples in range [-1, 1]
   * @returns {ArrayBuffer} - 16-bit PCM data
   */
  float32ToPCM16(float32Array) {
    const pcm16 = new Int16Array(float32Array.length);

    for (let i = 0; i < float32Array.length; i++) {
      // Clamp to [-1, 1] range
      const sample = Math.max(-1, Math.min(1, float32Array[i]));

      // Convert to 16-bit integer
      // Use 0x8000 for negative, 0x7FFF for positive to avoid overflow
      pcm16[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
    }

    return pcm16.buffer;
  }

  /**
   * Process audio input
   * Called automatically by Web Audio API for each 128-sample block
   */
  process(inputs, outputs, parameters) {
    const input = inputs[0];

    // No input available
    if (!input || !input[0]) {
      return true; // Keep processor alive
    }

    const channelData = input[0]; // Mono channel

    // Collect samples into buffer
    for (let i = 0; i < channelData.length; i++) {
      this.buffer[this.bufferIndex++] = channelData[i];

      // When we have a full 20ms chunk, send it to main thread
      if (this.bufferIndex >= this.chunkSize) {
        // Convert Float32 to PCM16
        const pcmData = this.float32ToPCM16(this.buffer);

        // Send to main thread
        this.port.postMessage({
          type: 'pcm',
          data: pcmData
        });

        // Reset buffer
        this.bufferIndex = 0;
      }
    }

    return true; // Keep processor alive
  }
}

// Register the processor
registerProcessor('pcm-processor', PCMProcessor);
