import { Injectable, signal, effect, OnDestroy } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IdleService implements OnDestroy {
    isIdle = signal(false);
    private idleTimer: any;
    // Default 30 seconds
    private readonly IDLE_THRESHOLD = 30000;

    constructor() {
        this.resetTimer();
        this.setupListeners();
    }

    private setupListeners() {
        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', this.resetTimer.bind(this));
            window.addEventListener('keydown', this.resetTimer.bind(this));
            window.addEventListener('click', this.resetTimer.bind(this));
            window.addEventListener('scroll', this.resetTimer.bind(this));
            window.addEventListener('touchstart', this.resetTimer.bind(this));
        }
    }

    private removeListeners() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('mousemove', this.resetTimer.bind(this));
            window.removeEventListener('keydown', this.resetTimer.bind(this));
            window.removeEventListener('click', this.resetTimer.bind(this));
            window.removeEventListener('scroll', this.resetTimer.bind(this));
            window.removeEventListener('touchstart', this.resetTimer.bind(this));
        }
    }

    resetTimer() {
        // If we were idle, wake up
        if (this.isIdle()) {
            this.isIdle.set(false);
        }

        // Clear existing timer
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
        }

        // Set new timer
        this.idleTimer = setTimeout(() => {
            this.isIdle.set(true);
        }, this.IDLE_THRESHOLD);
    }

    ngOnDestroy() {
        this.removeListeners();
        if (this.idleTimer) clearTimeout(this.idleTimer);
    }
}
