import { Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { NavigationService, Section } from '../../services/navigation.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    <nav class="sidebar-menu">
      <ul>
        @for (item of items; track item) {
          <li>
            <a [class.active]="navService.currentSection() === item" 
               (click)="navService.navigate(item)">
               {{ item | titlecase }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar-menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .sidebar-menu li {
      margin-bottom: 0.5em;
    }
    .sidebar-menu a {
      cursor: pointer;
      text-decoration: none;
      color: var(--secondary-color);
      display: block;
      padding: 5px;
    }
    .sidebar-menu a:hover, .sidebar-menu a.active {
      background-color: var(--primary-color);
      color: var(--background-color);
    }
    .sidebar-menu a::before {
      content: '> ';
    }
    
    @media (min-width: 768px) {
      .sidebar-menu a {
        display: block;
        width: 100%;
      }
    }
  `]
})
export class MenuListComponent {
  navService = inject(NavigationService);
  items: Section[] = ['about', 'skills', 'experience', 'education', 'testimonials', 'contact'];
}
