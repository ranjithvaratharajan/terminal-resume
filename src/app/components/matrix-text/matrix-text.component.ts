import { Component, Input, OnInit, OnDestroy, ElementRef, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-matrix-text',
    standalone: true,
    imports: [CommonModule],
    template: `<span>{{ displayString }}</span>`,
    styles: [`
    :host { display: inline-block; }
    span { font-family: monospace; white-space: pre-wrap; }
  `]
})
export class MatrixTextComponent implements OnInit, OnDestroy {
    @Input() text: string = '';
    @Input() speed: number = 30; // ms per update
    @Input() delay: number = 0;

    displayString: string = '';

    private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    private intervalId: any;
    private iterations = 0;
    private platformId = inject(PLATFORM_ID);
    private cdr = inject(ChangeDetectorRef);

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Mobile check: Disable animation for better performance/UX
            if (window.innerWidth < 768) {
                this.displayString = this.text;
                return;
            }

            // Initial placeholder
            this.displayString = this.text.split('').map(() => this.randomChar()).join('');

            setTimeout(() => {
                this.startDecryption();
            }, this.delay);
        } else {
            // SSR fallback
            this.displayString = this.text;
        }
    }

    ngOnDestroy() {
        if (this.intervalId) clearInterval(this.intervalId);
    }

    private startDecryption() {
        this.intervalId = setInterval(() => {
            this.displayString = this.text.split('').map((char, index) => {
                if (index < this.iterations) {
                    return this.text[index];
                }
                return this.randomChar();
            }).join('');

            // Slower resolution for longer text
            this.iterations += 1 / 2;

            if (this.iterations >= this.text.length) {
                clearInterval(this.intervalId);
                this.displayString = this.text; // Ensure final exact match
            }

            this.cdr.markForCheck();
        }, this.speed);
    }

    private randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}
