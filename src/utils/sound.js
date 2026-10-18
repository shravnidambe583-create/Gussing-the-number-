// Web Audio API Synthesizer for Little Guesser
// Generates cheerful, melodic, child-friendly sound effects without external audio files

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // muted by default as requested
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!muted) {
      this.init();
    }
  }

  // Soft cheerful button tap/bubble pop
  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    
    // Quick pitch rise for bouncy pop
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Playful boing when number is BIGGER (try higher)
  playHigher() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const now = this.ctx.currentTime;

    // Ascending slide
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.22);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Playful slide down when number is SMALLER (try lower)
  playLower() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const now = this.ctx.currentTime;

    // Descending slide
    osc.frequency.setValueAtTime(560, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.22);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Gentle soft bump for invalid input / empty
  playGentleOops() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(250, now);
    osc.frequency.linearRampToValueAtTime(200, now + 0.15);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Magical sparkling chime for hints and magic wand
  playMagicChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.18, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.35);
    });
  }

  // Big celebration victory fanfare!
  playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const chords = [
      { notes: [523.25, 659.25, 783.99], time: 0, dur: 0.2 },       // C major
      { notes: [587.33, 739.99, 880.00], time: 0.22, dur: 0.2 },    // D major
      { notes: [659.25, 783.99, 987.77], time: 0.44, dur: 0.25 },   // E minor/G
      { notes: [783.99, 987.77, 1318.51, 1567.98], time: 0.72, dur: 0.8 } // High C major chord hold
    ];

    const now = this.ctx.currentTime;

    chords.forEach(chord => {
      chord.notes.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + chord.time);

        gain.gain.setValueAtTime(0.14, now + chord.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + chord.time + chord.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + chord.time);
        osc.stop(now + chord.time + chord.dur);
      });
    });
  }

  // Badge unlock celebration sound
  playBadgeUnlock() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.15, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    });
  }
}

export const soundManager = new SoundFX();
