import { Component, inject, ViewChild, ElementRef, computed, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeRendererComponent } from '../resume-renderer/resume-renderer.component';
import { BootSequenceComponent } from '../boot-sequence/boot-sequence.component';
import { NavigationService } from '../../services/navigation.service';
import { ResumeService } from '../../services/resume.service';
import { ThemeService } from '../../services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-terminal-shell',
  standalone: true,
  imports: [CommonModule, ResumeRendererComponent, BootSequenceComponent],
  template: `
    <app-boot-sequence *ngIf="!bootFinished" (bootComplete)="onBootComplete()"></app-boot-sequence>
    
    <div class="terminal-window" *ngIf="bootFinished" (click)="focusInput()">
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
               (keydown.enter)="handleCommand(cmdInput.value); cmdInput.value=''" 
               autofocus />
      </div>
      <div class="status-bar">
        @for (item of newsItems(); track $index) {
          <span class="ticker-item">{{ item }} &nbsp;&nbsp;&nbsp; +++ &nbsp;&nbsp;&nbsp; </span>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
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
      animation: openWindow 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      position: relative;
      z-index: 100;
    }

    /* Status Bar (Ticker) */
    .status-bar {
      height: 30px;
      background: rgba(0, 0, 0, 0.8);
      border-top: 1px solid var(--secondary-color);
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      color: var(--ubuntu-orange);
      font-family: var(--font-stack);
      font-size: 0.85em;
      position: relative;
    }
    
    .ticker-item {
      display: inline-block;
      padding-left: 100%;
      animation: marquee 25s linear infinite;
    }
    
    @keyframes marquee {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-100%, 0); }
    }
    
    @keyframes openWindow {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
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
    
    @media (max-width: 768px) {
      :host { padding: 0; }
      .terminal-window {
        border-radius: 0;
        border: none;
        height: 100vh;
      }
      .terminal-controls { display: none; }
      .terminal-title { text-align: left; margin-left: 0; }
    }
  `]
})
export class TerminalShellComponent implements AfterViewInit {
  navService = inject(NavigationService);
  private resumeService = inject(ResumeService);
  private themeService = inject(ThemeService);

  bootFinished = false;

  resumeData = toSignal(this.resumeService.getResume());
  newsItems = computed(() => this.resumeData()?.newsItems || []);

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

  focusInput() {
    this.cmdInput?.nativeElement.focus();
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
        // This is a special case. Since we don't have a real stdout buffer, 
        // we'll trigger a 'help' navigation which we should update to show themes, 
        // or we can just blindly switch if they guess it.
        // For now, let's assume valid themes are: ubuntu, matrix, amber, cyberpunk, dracula, macos
        // We'll just define the switcher logic here.
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
