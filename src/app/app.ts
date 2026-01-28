import { Component } from '@angular/core';
import { TerminalShellComponent } from './components/terminal-shell/terminal-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TerminalShellComponent],
  template: `<app-terminal-shell></app-terminal-shell>`,
  styles: []
})
export class App { }
