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

    // Audio level calculation (for visualization)
    this.levelUpdateInterval = 100; // Send level updates every 100ms (10fps)
    this.levelSampleCount = 0;
    this.levelSumSquares = 0;
    this.lastLevelUpdate = 0;
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
   * Calculate RMS (Root Mean Square) level from audio samples
   * Returns value 0-100 representing audio level
   */
  calculateLevel(samples) {
    // Calculate RMS
    const rms = Math.sqrt(this.levelSumSquares / this.levelSampleCount);

    // Convert to percentage (0-100)
    // Assume -40dB to 0dB range maps to 0-100%
    // RMS of 0.01 (-40dB) = 0%, RMS of 1.0 (0dB) = 100%
    const db = 20 * Math.log10(Math.max(rms, 0.001)); // Avoid log(0)
    const percentage = Math.max(0, Math.min(100, ((db + 40) / 40) * 100));

    return percentage;
  }

  /**
   * Process audio input
   * Called automatically by Web Audio API for each 128-sample block
   */
  process(inputs, _outputs, _parameters) {
    const input = inputs[0];

    // No input available
    if (!input || !input[0]) {
      return true; // Keep processor alive
    }

    const channelData = input[0]; // Mono channel
    const currentTime = currentFrame / sampleRate * 1000; // Convert to milliseconds

    // Collect samples into buffer and calculate level
    for (let i = 0; i < channelData.length; i++) {
      const sample = channelData[i];
      this.buffer[this.bufferIndex++] = sample;

      // Accumulate for level calculation (RMS)
      this.levelSumSquares += sample * sample;
      this.levelSampleCount++;

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

    // Send level updates every 100ms (10fps)
    if (currentTime - this.lastLevelUpdate >= this.levelUpdateInterval) {
      if (this.levelSampleCount > 0) {
        const level = this.calculateLevel();

        this.port.postMessage({
          type: 'level',
          level: level
        });

        // Reset level calculation
        this.levelSumSquares = 0;
        this.levelSampleCount = 0;
        this.lastLevelUpdate = currentTime;
      }
    }

    return true; // Keep processor alive
  }
}

// Register the processor
registerProcessor('pcm-processor', PCMProcessor);
