import { Component } from '@angular/core';
import { MenuListComponent } from '../menu-list/menu-list.component';
import { ResumeRendererComponent } from '../resume-renderer/resume-renderer.component';

@Component({
    selector: 'app-terminal-shell',
    standalone: true,
    imports: [MenuListComponent, ResumeRendererComponent],
    template: `
    <div class="terminal-window">
      <header class="terminal-header">
        <div class="terminal-controls">
          <span class="control red"></span>
          <span class="control yellow"></span>
          <span class="control green"></span>
        </div>
        <div class="terminal-title">user@resume:~$</div>
      </header>
      <div class="terminal-body">
        <aside class="sidebar">
          <app-menu-list></app-menu-list>
        </aside>
        <main class="main-content">
          <app-resume-renderer></app-resume-renderer>
        </main>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      padding: 1em;
      height: 100vh;
      box-sizing: border-box;
    }
    .terminal-window {
      border: 2px solid var(--secondary-color);
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: var(--background-color);
      box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
    }
    .terminal-header {
      background-color: var(--surface-color);
      padding: 0.5em;
      border-bottom: 2px solid var(--secondary-color);
      display: flex;
      align-items: center;
    }
    .terminal-controls {
      display: flex;
      gap: 5px;
      margin-right: 1em;
    }
    .control {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .red { background-color: #ff5f56; }
    .yellow { background-color: #ffbd2e; }
    .green { background-color: #27c93f; }
    
    .terminal-title {
      font-family: var(--font-stack);
      color: var(--font-color);
      flex-grow: 1;
      text-align: center;
    }
    
    .terminal-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    
    .sidebar {
      width: 250px;
      border-right: 2px solid var(--secondary-color);
      padding: 1em;
      overflow-y: auto;
    }
    
    .main-content {
      flex: 1;
      padding: 0;
      overflow: hidden;
    }
    
    @media (max-width: 768px) {
      .terminal-body {
        flex-direction: column;
      }
      .sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 2px solid var(--secondary-color);
        height: auto;
        max-height: 200px;
      }
    }
  `]
})
export class TerminalShellComponent { }
