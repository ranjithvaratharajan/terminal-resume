import { Component, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ResumeRendererComponent } from '../resume-renderer/resume-renderer.component';
import { NavigationService, Section } from '../../services/navigation.service';

@Component({
  selector: 'app-terminal-shell',
  standalone: true,
  imports: [ResumeRendererComponent],
  template: `
    <div class="terminal-window" (click)="focusInput()">
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
      z-index: 201; /* Above CRT scanlines if needed, or let CRT overlay cover it. 
                      Actually CRT is pointer-events-none z-index 200. 
                      Let's keep this under the CRT effect for full retro feel. 
                      So z-index auto or lower than 200. */
      z-index: 100;
    }
    
    @keyframes openWindow {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    .terminal-header {
      background: rgba(0, 0, 0, 0.4);
      padding: 12px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;
    }
    
    .terminal-title {
      color: var(--font-color);
      font-family: var(--font-stack);
      font-size: 14px;
      text-align: center;
      flex-grow: 1;
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
    }

    .terminal-controls {
      display: flex;
      gap: 10px;
    }
    
    .control {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .control:hover { transform: scale(1.1); }
    
    .close { background-color: #ff5f56; box-shadow: 0 0 8px #ff5f56; }
    .minimize { background-color: #ffbd2e; box-shadow: 0 0 8px #ffbd2e; }
    .maximize { background-color: #27c93f; box-shadow: 0 0 8px #27c93f; }

    .terminal-body {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
      background: transparent; /* Let glass bg show through */
    }
    
    .main-content {
      flex: 1;
      padding: 0;
      overflow: hidden;
      position: relative;
    }

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
  @ViewChild('cmdInput') cmdInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.focusInput();
  }

  focusInput() {
    this.cmdInput?.nativeElement.focus();
  }

  handleCommand(cmd: string) {
    const command = cmd.trim().toLowerCase();

    if (command === 'clear') {
      // For now clear just maps to help or about? Let's map to help
      this.navService.navigate('help');
      return;
    }

    const sections: Section[] = ['about', 'skills', 'experience', 'education', 'testimonials', 'contact', 'help'];

    if (sections.includes(command as Section)) {
      this.navService.navigate(command as Section);
    } else {
      // Optional: Handle unknown command
      // For now, just stay or maybe go to help
    }
  }
}
