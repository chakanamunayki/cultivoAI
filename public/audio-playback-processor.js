/**
 * Audio Playback Worklet Processor for Gemini Live API
 *
 * Handles smooth playback of 24kHz PCM16 audio chunks from Gemini.
 * Uses a ring buffer to eliminate crackling and ensure continuous playback.
 */

class AudioPlaybackProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    // Ring buffer for smooth playback (2 seconds at 24kHz)
    this.bufferSize = 24000 * 2;
    this.buffer = new Float32Array(this.bufferSize);
    this.writePos = 0;
    this.readPos = 0;
    this.samplesAvailable = 0;

    // Listen for audio data from main thread
    this.port.onmessage = (event) => {
      if (event.data.type === 'audio') {
        this.enqueueAudio(event.data.data);
      } else if (event.data.type === 'reset') {
        this.reset();
      }
    };
  }

  /**
   * Add audio samples to the ring buffer
   */
  enqueueAudio(float32Samples) {
    for (let i = 0; i < float32Samples.length; i++) {
      this.buffer[this.writePos] = float32Samples[i];
      this.writePos = (this.writePos + 1) % this.bufferSize;
      this.samplesAvailable++;

      // Prevent buffer overflow
      if (this.samplesAvailable > this.bufferSize) {
        this.samplesAvailable = this.bufferSize;
        this.readPos = this.writePos;
      }
    }
  }

  /**
   * Reset the buffer
   */
  reset() {
    this.writePos = 0;
    this.readPos = 0;
    this.samplesAvailable = 0;
    this.buffer.fill(0);
  }

  /**
   * Process audio - called by Web Audio API for each 128-sample render quantum
   */
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const outputChannel = output[0];

    // Fill output with samples from buffer
    for (let i = 0; i < outputChannel.length; i++) {
      if (this.samplesAvailable > 0) {
        outputChannel[i] = this.buffer[this.readPos];
        this.readPos = (this.readPos + 1) % this.bufferSize;
        this.samplesAvailable--;
      } else {
        // No samples available - output silence
        outputChannel[i] = 0;
      }
    }

    // Continue processing
    return true;
  }
}

registerProcessor('audio-playback-processor', AudioPlaybackProcessor);
