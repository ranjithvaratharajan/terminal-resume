import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-resume-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (resume(); as data) {
      <div class="content-area">
        @switch (navService.currentSection()) {
          @case ('about') {
            <div class="section about">
              <h2 class="terminal-prompt">{{ data.about.name }}</h2>
              <h3 class="role">{{ data.about.title }}</h3>
              <p class="tagline">"{{ data.about.tagline }}"</p>
              <p class="summary">{{ data.about.summary }}</p>
              @if (data.about.cv_file_url) {
                <div class="download-cv">
                  <a [href]="data.about.cv_file_url" target="_blank">[Download CV]</a>
                </div>
              }
            </div>
          }
          @case ('experience') {
            <div class="section experience">
              <h2>Experience_Log</h2>
              @for (job of data.experience; track job.id) {
                <div class="job-card">
                  <div class="job-header">
                    <span class="company">{{ job.company }}</span>
                    <span class="duration">[{{ job.startDate }} - {{ job.endDate }}]</span>
                  </div>
                  <div class="role-title">> {{ job.title }}</div>
                  <p class="description">{{ job.description }}</p>
                </div>
              }
            </div>
          }
          @case ('education') {
            <div class="section education">
              <h2>Education_History</h2>
              @for (edu of data.education; track edu.id) {
                <div class="edu-card">
                  <div class="edu-header">
                    <span class="company">{{ edu.name }}</span>
                    <span class="duration">[{{ edu.startYear }} - {{ edu.endYear }}]</span>
                  </div>
                  <div class="role-title">> {{ edu.title }}</div>
                  @if (edu.class) {
                    <div class="grade">Class: {{ edu.class }}</div>
                  }
                  @if (edu.percentage) {
                    <div class="grade">Score: {{ edu.percentage }}</div>
                  }
                </div>
              }
            </div>
          }
          @case ('skills') {
            <div class="section skills">
              <h2>Installed_Packages</h2>
              <div class="skills-grid">
                @for (skill of data.skills; track skill.id) {
                  <div class="skill-item">
                    <span class="skill-name">./{{ skill.title }}</span>
                    <div class="progress-bar">
                      <div class="progress" [style.width.%]="skill.percentage"></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
          @case ('testimonials') {
            <div class="section testimonials">
              <h2>User_Reviews</h2>
              @for (t of data.testimonials; track t.id) {
                <div class="testimonial-card">
                  <blockquote>
                    "{{ t.comments }}"
                  </blockquote>
                  <div class="author">
                    <span class="name">- {{ t.name }}</span>
                    <span class="position">({{ t.position }})</span>
                  </div>
                </div>
              }
            </div>
          }
          @case ('contact') {
            <div class="section contact">
              <h2>Communications</h2>
              <dl>
                <div>
                  <dt>Email:</dt>
                  <dd><a [href]="'mailto:' + data.contact.email">{{ data.contact.email }}</a></dd>
                </div>
                @if (data.contact.phone) {
                  <div>
                    <dt>Phone:</dt>
                    <dd>{{ data.contact.phone }}</dd>
                  </div>
                }
                @if (data.contact.location) {
                  <div>
                    <dt>Location:</dt>
                    <dd>{{ data.contact.location }}</dd>
                  </div>
                }
              </dl>
              <h3>Social_Links</h3>
              <ul class="social-links">
                @for (link of data.contact.social; track link.url) {
                  <li>
                    <a [href]="link.url" target="_blank">{{ link.platform }}</a>
                  </li>
                }
              </ul>
            </div>
          }
        }
      </div>
    } @else {
      <div class="loading">Loading data...</div>
    }
  `,
  styles: [`
    .content-area {
      padding: 1em;
      border: 1px dashed var(--secondary-color);
      height: 100%;
      overflow-y: auto;
    }
    .terminal-prompt::before {
      content: '> ';
      color: var(--primary-color);
    }
    .role { color: var(--secondary-color); margin-bottom: 0.5em; }
    .tagline { font-style: italic; color: var(--font-color); opacity: 0.8; }
    
    .job-card, .edu-card { margin-bottom: 2em; }
    .job-header, .edu-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--secondary-color);
      margin-bottom: 0.5em;
    }
    .company { font-weight: bold; color: var(--primary-color); }
    .role-title { color: var(--font-color); font-weight: bold; }
    .description { margin-top: 0.5em; white-space: pre-wrap; }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1em;
    }
    .skill-item {
      border: 1px solid var(--secondary-color);
      padding: 0.5em;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .progress-bar {
      background: var(--secondary-color);
      height: 4px;
      width: 100%;
    }
    .progress {
      background: var(--primary-color);
      height: 100%;
    }
    
    .testimonial-card {
      border-left: 4px solid var(--primary-color);
      padding-left: 1em;
      margin-bottom: 2em;
    }
    blockquote { font-style: italic; margin-bottom: 0.5em; }
    .author { display: flex; flex-direction: column; font-size: 0.9em; }
    .name { color: var(--primary-color); font-weight: bold; }
    
    dl {
      display: grid;
      grid-template-columns: max-content auto;
      gap: 1em;
      margin-bottom: 2em;
    }
    dt { color: var(--primary-color); font-weight: bold; margin-right: 1em; }
    
    .social-links { list-style: none; padding: 0; }
    .social-links li { margin-bottom: 0.5em; }
    .social-links li::before { content: '- '; color: var(--secondary-color); }
    
    a { color: var(--font-color); }
    a:hover { background-color: var(--primary-color); color: var(--background-color); }
    
    @media (max-width: 600px) {
      .job-header, .edu-header { flex-direction: column; }
    }
  `]
})
export class ResumeRendererComponent {
  navService = inject(NavigationService);
  private resumeService = inject(ResumeService);

  resume = toSignal(this.resumeService.getResume());
}
