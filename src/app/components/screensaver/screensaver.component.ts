import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-screensaver',
    standalone: true,
    imports: [CommonModule],
    template: `
    <canvas #matrixCanvas></canvas>
    <div class="wake-hint">[ PRESS ANY KEY TO WAKE ]</div>
  `,
    styles: [`
    :host {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: #000;
      z-index: 9998; /* Just below boot sequence (9999) but above terminal */
      overflow: hidden;
    }
    
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    .wake-hint {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 14px;
      animation: pulse 2s infinite;
      pointer-events: none;
    }

    @keyframes pulse {
      0% { opacity: 0.3; }
      50% { opacity: 0.8; }
      100% { opacity: 0.3; }
    }
  `]
})
export class ScreensaverComponent implements AfterViewInit, OnDestroy {
    @ViewChild('matrixCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private themeService = inject(ThemeService);

    private ctx!: CanvasRenderingContext2D;
    private animationId: number = 0;
    private columns: number[] = [];
    private fontSize = 16;
    private drops: number[] = [];

    // Theme Color (default green)
    private matrixColor = '#0F0';

    constructor() {
        effect(() => {
            this.updateMatrixColor(this.themeService.activeTheme());
        });
    }

    updateMatrixColor(themeName: string) {
        const themeColors: { [key: string]: string } = {
            'ubuntu': '#E95420', // Orange
            'matrix': '#0F0',    // Green
            'amber': '#FFB000',  // Amber
            'cyberpunk': '#FF00FF', // Pink
            'dracula': '#BD93F9',   // Purple
            'macos': '#FFFFFF'      // White
        };
        this.matrixColor = themeColors[themeName.toLowerCase()] || '#0F0';
    }

    ngAfterViewInit() {
        this.initMatrix();
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    initMatrix() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const columnsCount = Math.floor(canvas.width / this.fontSize);
        this.drops = Array(columnsCount).fill(1);

        this.animate();
    }

    handleResize() {
        if (this.canvasRef?.nativeElement) {
            this.canvasRef.nativeElement.width = window.innerWidth;
            this.canvasRef.nativeElement.height = window.innerHeight;
            // Reset drops on resize usually looks cleaner
            const columnsCount = Math.floor(window.innerWidth / this.fontSize);
            this.drops = Array(columnsCount).fill(1);
        }
    }

    animate() {
        // Semi-transparent black to create leave trails
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

        this.ctx.fillStyle = this.matrixColor;
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            // Random character (Katakana/Roman mix)
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);

            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            // Sending the drop back to the top randomly after it has crossed the screen
            if (this.drops[i] * this.fontSize > this.canvasRef.nativeElement.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }

    ngOnDestroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.handleResize.bind(this));
    }
}
