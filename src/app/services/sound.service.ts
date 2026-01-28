import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SoundService {
    private audioCtx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private isMuted = false;

    constructor() {
        this.initAudio();
    }

    private initAudio() {
        if (typeof window !== 'undefined' && window.AudioContext) {
            this.audioCtx = new AudioContext();
            this.masterGain = this.audioCtx.createGain();
            this.masterGain.gain.value = 0.1; // Low volume default
            this.masterGain.connect(this.audioCtx.destination);
        }
    }

    async resumeAudioContext() {
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            await this.audioCtx.resume();
        }
    }

    playKeystroke() {
        if (this.isMuted || !this.audioCtx || !this.masterGain) return;
        this.resumeAudioContext();

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'square';
        // Randomize pitch slightly for realism
        osc.frequency.setValueAtTime(800 + Math.random() * 200, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
    }

    playOk() {
        if (this.isMuted || !this.audioCtx || !this.masterGain) return;
        this.resumeAudioContext();

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
        osc.frequency.setValueAtTime(1800, this.audioCtx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.2);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.2);
    }

    playBootHum() {
        if (this.isMuted || !this.audioCtx || !this.masterGain) return;
        this.resumeAudioContext();

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(50, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.audioCtx.currentTime + 1.0);

        gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, this.audioCtx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.5);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 1.5);
    }
}
