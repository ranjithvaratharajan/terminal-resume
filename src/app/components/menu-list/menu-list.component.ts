import { Component, inject } from '@angular/core';
import { NavigationService, Section } from '../../services/navigation.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  template: `
    <nav class="tab-bar">
      @for (item of items; track item) {
        <a [class.active]="navService.currentSection() === item"
           (click)="navService.navigate(item)">
           {{ item }}
        </a>
      }
    </nav>
  `,
  styles: [`
    .tab-bar {
      display: flex;
      background-color: #3e3e3e; /* Tab bar background */
      padding-top: 5px;
      padding-left: 10px;
      border-bottom: 1px solid var(--secondary-color);
      user-select: none;
    }
    
    a {
      padding: 5px 15px;
      margin-right: 2px;
      background-color: #2c2c2c; /* Inactive tab bg */
      color: #999;
      text-decoration: none;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      font-family: 'Ubuntu', sans-serif;
      font-size: 13px;
      cursor: pointer;
      position: relative;
    }
    
    a:hover {
      background-color: #383838;
      color: #ccc;
    }
    
    a.active {
      background-color: var(--background-color); /* Matches terminal body */
      color: var(--primary-color);
      font-weight: bold;
      z-index: 1; /* Sit above the border */
    }
    
    /* Mobile Styles */
    @media (max-width: 768px) {
      .tab-bar {
        overflow-x: auto;
        white-space: nowrap;
        padding-bottom: 0;
      }
      a {
        padding: 8px 15px; /* Larger hit area */
      }
    }
  `]
})
export class MenuListComponent {
  navService = inject(NavigationService);
  items: Section[] = ['about', 'skills', 'experience', 'education', 'testimonials', 'contact'];
}
