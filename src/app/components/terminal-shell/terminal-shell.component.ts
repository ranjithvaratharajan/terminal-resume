import { Component, inject, ViewChild, ElementRef, computed, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ResumeRendererComponent } from '../resume-renderer/resume-renderer.component';
import { BootSequenceComponent } from '../boot-sequence/boot-sequence.component';
import { ScreensaverComponent } from '../screensaver/screensaver.component';
import { NavigationService } from '../../services/navigation.service';
import { ResumeService } from '../../services/resume.service';
import { ThemeService } from '../../services/theme.service';
import { IdleService } from '../../services/idle.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-terminal-shell',
  standalone: true,
  imports: [CommonModule, ResumeRendererComponent, BootSequenceComponent, ScreensaverComponent],
  template: `
    <app-boot-sequence *ngIf="!bootFinished" (bootComplete)="onBootComplete()"></app-boot-sequence>
    
    <!-- Screensaver sits on top when idle AND boot is done -->
    <app-screensaver *ngIf="bootFinished && idleService.isIdle()"></app-screensaver>

    <div class="terminal-window" *ngIf="bootFinished" (click)="focusInput()">
      <div class="scanline-overlay"></div>
      <header class="terminal-header">
        <div class="terminal-title">user@resume: ~</div>
        <div class="terminal-controls">
          <span class="control minimize"></span>
          <span class="control maximize"></span>
          <span class="control close"></span>
        </div>
      </header>
      <div class="terminal-body">
        <main class="main-content">
          <app-resume-renderer></app-resume-renderer>
        </main>
      </div>
      <div class="cli-input-line">
        <span class="prompt">user@resume:~$</span>
        <input #cmdInput 
               type="text" 
               class="cmd-input"
               (keydown.enter)="handleCommand(cmdInput.value); cmdInput.value=''" />
      </div>
      <div class="status-bar">
        <div class="ticker-track">
           <span class="ticker-content">{{ tickerContent() }}</span>
           <!-- Duplicate for seamless loop -->
           <span class="ticker-content">{{ tickerContent() }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100dvh;
      width: 100vw;
      /* Deep Space Gradient */
      background: radial-gradient(circle at center, #2b1121 0%, #000000 100%);
      padding: 2em;
      box-sizing: border-box;
      overflow: hidden;
    }
    
    .terminal-window {
      width: 100%;
      max-width: 1200px;
      height: 85vh;
      
      /* Glassmorphism */
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      
      /* Neon Glow Shadow */
      box-shadow: 
        0 0 20px rgba(119, 41, 83, 0.3),
        0 0 60px rgba(0, 0, 0, 0.5);
        
      overflow: hidden;
      animation: crtTurnOn 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      position: relative;
      z-index: 100;
    }

    /* CRT Turn On Animation */
    @keyframes crtTurnOn {
      0% { transform: scale(0.1) scaleY(0.01); opacity: 0; filter: brightness(3); }
      40% { transform: scale(0.1) scaleY(0.01); opacity: 1; filter: brightness(3); }
      60% { transform: scale(1) scaleY(0.01); opacity: 1; filter: brightness(2); }
      100% { transform: scale(1) scaleY(1); opacity: 1; filter: brightness(1); }
    }
    
    .terminal-header {
      height: 30px;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .terminal-title {
      color: #aaa;
      font-family: var(--font-stack);
      font-size: 0.9em;
    }
    
    .terminal-controls {
      position: absolute;
      left: 10px;
      display: flex;
      gap: 8px;
    }
    
    .control {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
    }
    
    .close { background: #ff5f56; }
    .minimize { background: #ffbd2e; }
    .maximize { background: #27c93f; }
    
    .terminal-body {
      flex: 1;
      padding: 0; 
      overflow: hidden;
      position: relative;
    }
    
    .main-content {
      height: 100%;
      overflow-y: auto;
    }
    
    /* Scrollbar */
    .main-content::-webkit-scrollbar { width: 10px; }
    .main-content::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
    .main-content::-webkit-scrollbar-thumb { background: var(--secondary-color); border-radius: 5px; }
    .main-content::-webkit-scrollbar-thumb:hover { background: var(--ubuntu-orange); }

    .cli-input-line {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background: rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .prompt {
      color: var(--neon-green);
      margin-right: 12px;
      font-weight: bold;
      text-shadow: 0 0 5px var(--neon-green);
    }

    .cmd-input {
      flex: 1;
      background: transparent;
      border: none;
      color: #fff;
      font-family: var(--font-stack);
      font-size: var(--global-font-size);
      outline: none;
      caret-color: var(--neon-pink); /* Cool cursor color */
    }

    .status-bar {
      height: 30px; /* Slightly taller for readability */
      background: #000; /* Max contrast background */
      color: #fff;
      display: flex;
      align-items: center;
      padding: 0;
      font-size: 14px; /* Fixed legible size */
      font-family: 'Consolas', 'Monaco', monospace;
      border-top: 1px solid var(--primary-color);
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.5);
    }
    
    .ticker-track {
      display: flex;
      animation: ticker 45s linear infinite; /* Much slower */
      width: max-content;
    }

    .ticker-content {
      padding-right: 50px;
      font-weight: bold;
      color: var(--primary-color); /* Match theme's brightest color */
      text-shadow: 0 0 5px var(--primary-color); /* Glow */
      letter-spacing: 1px;
    }
    
    @keyframes ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    @media (max-width: 768px) {
      :host { padding: 0; }
      .terminal-window {
        border-radius: 0;
        border: none;
        height: 100dvh;
        padding-bottom: env(safe-area-inset-bottom);
      }
      .terminal-controls { display: none; }
      .terminal-title { text-align: left; margin-left: 0; }
    }

    /* CRT Effects */
    .scanline-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0) 50%,
        rgba(0, 0, 0, 0.2) 50%,
        rgba(0, 0, 0, 0.2)
      );
      background-size: 100% 4px;
      pointer-events: none;
      z-index: 500;
      opacity: 0.6;
    }

    /* Screen Flicker & RGB Split */
    .terminal-body, .cli-input-line, .status-bar {
      animation: flicker 0.15s infinite;
      text-shadow: 2px 0 1px rgba(255, 0, 0, 0.3), -2px 0 1px rgba(0, 255, 255, 0.3);
    }

    @keyframes flicker {
      0% { opacity: 0.98; }
      50% { opacity: 0.95; }
      100% { opacity: 0.99; }
    }
  `]
})
export class TerminalShellComponent implements AfterViewInit {
  navService = inject(NavigationService);
  private resumeService = inject(ResumeService);
  private themeService = inject(ThemeService);
  idleService = inject(IdleService);

  bootFinished = false;

  resumeData = toSignal(this.resumeService.getResume());
  newsItems = computed(() => this.resumeData()?.newsItems || []);

  // Join all items for the ticker
  tickerContent = computed(() => {
    const items = this.newsItems();
    return items.length ? items.join('   +++   ') + '   +++   ' : '';
  });

  @ViewChild('cmdInput') cmdInput!: ElementRef;

  onBootComplete() {
    this.bootFinished = true;
    setTimeout(() => this.focusInput(), 100);
  }

  ngAfterViewInit() {
    if (this.bootFinished) {
      this.focusInput();
    }
  }

  private platformId = inject(PLATFORM_ID);

  focusInput() {
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 768) {
      this.cmdInput?.nativeElement.focus();
    }
  }

  handleCommand(cmd: string) {
    if (!cmd.trim()) return;

    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    if (command === 'clear') {
      // simple clear (visual only in this context)
    } else if (command === 'theme') {
      if (arg === 'list') {
        console.log('Available themes: ubuntu, matrix, amber, cyberpunk, dracula, macos');
      } else if (arg && ['ubuntu', 'matrix', 'amber', 'cyberpunk', 'dracula', 'macos'].includes(arg)) {
        this.themeService.setTheme(arg);
      }
    } else if (['about', 'skills', 'experience', 'education', 'testimonials', 'clients', 'contact', 'help'].includes(command)) {
      this.navService.navigate(command as any);
    }

    // Always refocus
    setTimeout(() => this.cmdInput.nativeElement.scrollIntoView(), 10);
  }
}
