import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-boot-sequence',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="boot-screen" (click)="forceStart()">
      
      <!-- Start Overlay for Audio Context -->
      <div class="start-overlay" *ngIf="!started">
         <div class="blink">[ PRESS ENTER TO BOOT SYSTEM ]</div>
      </div>

      <div *ngIf="started">
        @for (line of lines; track $index) {
          <div class="boot-line" [innerHTML]="line"></div>
        }
        <div class="boot-line" *ngIf="memoryCheck">
          Memory Test: <span class="highlight">{{ memoryCount }}KB OK</span>
        </div>
        <div class="cursor">_</div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: #000;
      color: #ccc;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 16px;
      padding: 20px;
      z-index: 9999;
      cursor: none;
      overflow: hidden;
      user-select: none;
    }

    .start-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      display: flex;
      align-items: center; justify-content: center;
      background: #000;
      z-index: 10000;
      cursor: pointer;
    }
    
    .start-overlay .blink {
      font-size: 1.5em;
      color: var(--neon-green, #0f0);
      animation: blink 0.5s step-end infinite;
      text-shadow: 0 0 10px var(--neon-green, #0f0);
    }

    @media (max-width: 768px) {
      .start-overlay .blink {
        font-size: 1em;
      }
    }

    .boot-line {
      margin-bottom: 2px;
      white-space: pre-wrap;
      text-shadow: 0 0 2px rgba(255,255,255,0.5);
    }
    
    /* These classes will be used in innerHTML */
    ::ng-deep .status-ok { color: #0f0; font-weight: bold; text-shadow: 0 0 5px #0f0; }
    ::ng-deep .status-warn { color: #ffa500; font-weight: bold; }
    ::ng-deep .highlight { color: #fff; font-weight: bold; }

    .cursor {
      display: inline-block;
      animation: blink 0.5s step-end infinite;
    }

    @keyframes blink {
      50% { opacity: 0; }
    }
  `]
})
export class BootSequenceComponent implements OnInit {
  @Output() bootComplete = new EventEmitter<void>();
  private cdr = inject(ChangeDetectorRef);
  private soundService = inject(SoundService);

  started = false;
  lines: string[] = [];
  memoryCount = 0;
  memoryCheck = false;

  private bootScript = [
    'BIOS Date 01/28/26 20:21:42 Ver: 08.00.15',
    'CPU: Quantum Core i9-9900K CPU @ 5.00GHz',
    'Speed: 5000 MHz',
    '',
  ];

  // Listen for Enter key to start
  ngOnInit() {
    window.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.started && event.key === 'Enter') {
      this.forceStart();
    }
  }

  async forceStart() {
    if (this.started) return;
    this.started = true;
    await this.soundService.resumeAudioContext();
    this.soundService.playBootHum();
    this.cdr.detectChanges();
    this.runSequence();
  }

  async runSequence() {
    // Phase 1: Initial Info
    for (const line of this.bootScript) {
      await this.delay(200);
      this.addLine(line);
    }

    // Phase 2: Memory Test
    this.memoryCheck = true;
    const totalMem = 65536; // 64GB
    const step = 2048; // Faster
    while (this.memoryCount < totalMem) {
      this.memoryCount += step;
      this.soundService.playKeystroke(); // Tick sound
      this.cdr.detectChanges();
      await this.delay(20);
    }
    await this.delay(200);
    this.memoryCheck = false;
    this.addLine(`Memory Test: <span class="highlight">${totalMem}KB OK</span>`);
    this.soundService.playOk();
    this.addLine('');

    // Phase 3: Hardware Detection
    await this.delay(400);
    this.addLine('Detecting Primary Master ... <span class="highlight">Resume_Drive_V1 (SSD)</span>');
    this.soundService.playKeystroke();
    await this.delay(200);
    this.addLine('Detecting Primary Slave  ... None');
    await this.delay(400);

    // Phase 4: Loading Bar
    this.addLine('');
    this.addLine('Booting from Resume_Drive_V1...');
    await this.delay(500);

    // Fake Progress Bar
    let progressBar = '[';
    const width = 40;
    this.lines.push(progressBar); // Add the progress line
    const progressIndex = this.lines.length - 1;

    for (let i = 0; i < width; i++) {
      progressBar += '#';
      this.lines[progressIndex] = progressBar + ']';
      this.soundService.playKeystroke();
      this.cdr.detectChanges();
      await this.delay(30);
    }
    this.lines[progressIndex] = progressBar + '] <span class="status-ok">DONE</span>';
    this.soundService.playOk();
    this.cdr.detectChanges();

    await this.delay(500);

    // System Checks
    this.addLine('Loading Kernel Modules .................... <span class="status-ok">[OK]</span>');
    this.soundService.playOk();
    await this.delay(200);

    this.addLine('Mounting Filesystems ...................... <span class="status-ok">[OK]</span>');
    this.soundService.playOk();
    await this.delay(200);

    this.addLine('Initializing Neural Neural Network ........ <span class="status-warn">[WARN]</span> (Skipping)');
    this.soundService.playKeystroke();
    await this.delay(300);

    this.addLine('Starting User Interface ................... <span class="status-ok">[OK]</span>');
    this.soundService.playBootHum(); // Final big sound
    await this.delay(800);

    // Finish
    this.bootComplete.emit();
  }

  addLine(text: string) {
    this.lines.push(text);
    this.soundService.playKeystroke();
    this.cdr.detectChanges();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
