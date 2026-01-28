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
            <div class="section about typing-container">
              <h2 class="section-header">
                <span class="cmd"><span class="cmd-prefix">$</span> cat ./about</span>
                <button class="back-btn" (click)="navService.navigate('help')">[ .. ] return</button>
              </h2>
              <div class="about-card fade-in">
                <div class="profile-header">
                  <div class="ascii-art">
                     <!-- Simple ASCII placeholder for an image/avatar -->
                     <pre>
██████╗ ██╗   ██╗
██╔══██╗██║   ██║
██████╔╝██║   ██║
██╔══██╗╚██╗ ██╔╝
██║  ██║ ╚████╔╝ 
╚═╝  ╚═╝  ╚═══╝  
                     </pre>
                  </div>
                  <div>
                    <h1 class="name">{{ data.about.name }}</h1>
                    <h3 class="role">> {{ data.about.title }} <span class="blink">_</span></h3>
                  </div>
                </div>
                
                <p class="tagline">"{{ data.about.tagline }}"</p>
                <div class="summary-block">
                  <p class="summary">{{ data.about.summary }}</p>
                </div>
                
                @if (data.about.cv_file_url) {
                  <div class="actions">
                    <a [href]="data.about.cv_file_url" target="_blank" class="btn">[ DOWNLOAD_CV ]</a>
                  </div>
                }
              </div>
            </div>
          }
          @case ('experience') {
            <div class="section experience">
              <h2 class="section-header">
                <span class="cmd"><span class="cmd-prefix">$</span> git log --graph --oneline</span>
                <button class="back-btn" (click)="navService.navigate('help')">[ .. ] return</button>
              </h2>
              <div class="git-graph">
                @for (job of data.experience; track job.id; let first = $first) {
                  <div class="commit-node fade-in" [style.animation-delay]="job.id * 100 + 'ms'">
                    <div class="graph-visual">
                      <span class="dot" [class.latest]="first"></span>
                      <span class="line"></span>
                    </div>
                    <div class="commit-content">
                      <div class="commit-header">
                        <span class="hash">{{ job.startDate }}</span> 
                        <span class="msg">{{ job.title }} @ {{ job.company }}</span>
                      </div>
                      <div class="commit-body">
                        <p>{{ job.description }}</p>
                      </div>
                    </div>
                  </div>
                }
                <div class="commit-node fade-in">
                  <div class="graph-visual">
                    <span class="dot start"></span>
                  </div>
                  <div class="commit-content">
                    <span class="hash">Initial Commit</span> 
                    <span class="msg">Career Started</span>
                  </div>
                </div>
              </div>
            </div>
          }
          @case ('education') {
            <div class="section education">
              <h2 class="section-header">
                <span class="cmd"><span class="cmd-prefix">$</span> cat ./education</span>
                <button class="back-btn" (click)="navService.navigate('help')">[ .. ] return</button>
              </h2>
              <div class="json-output">
                @for (edu of data.education; track edu.id) {
                  <div class="json-block fade-in" [style.animation-delay]="edu.id * 100 + 'ms'">
                    <span class="key">"{{ edu.startYear }}-{{ edu.endYear }}"</span>: &#123;
                      <div class="indent">
                        <span class="key">"degree"</span>: <span class="string">"{{ edu.title }}"</span>,
                        <br>
                        <span class="key">"institution"</span>: <span class="string">"{{ edu.name }}"</span>,
                        @if (edu.class) {
                          <br>
                          <span class="key">"class"</span>: <span class="string">"{{ edu.class }}"</span>
                        }
                      </div>
                    &#125;,
                  </div>
                }
              </div>
            </div>
          }
          @case ('skills') {
            <div class="section skills">
               <h2 class="section-header">
                 <span class="cmd"><span class="cmd-prefix">$</span> ./show_stats.sh</span>
                 <button class="back-btn" (click)="navService.navigate('help')">[ .. ] return</button>
               </h2>
               <div class="skills-grid">
                 @for (skill of data.skills; track skill.id) {
                   <div class="skill-row fade-in" [style.animation-delay]="skill.id * 50 + 'ms'">
                     <span class="skill-name">{{ skill.title }}</span>
                     <div class="ascii-progress">
                       <span class="filled" [style.width.%]="skill.percentage">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</span>
                       <span class="empty">░░░░░░░░░░░░░░░░░░░░</span>
                     </div>
                     <span class="percent">{{ skill.percentage }}%</span>
                   </div>
                 }
               </div>
            </div>
          }
          @case ('testimonials') {
             <div class="section testimonials">
                <h2 class="section-header">
                  <span class="cmd"><span class="cmd-prefix">$</span> tail -n 10 user_reviews.log</span>
                  <button class="back-btn" (click)="navService.navigate('help')">[ .. ] return</button>
                </h2>
                @for (t of data.testimonials; track t.id) {
                  <div class="log-entry fade-in" [style.animation-delay]="t.id * 100 + 'ms'">
                    <span class="log-date">[INFO]</span> 
                    <span class="log-user">{{ t.name }}</span>
                    <span class="log-role">({{ t.position }})</span>:
                    <p class="log-msg">"{{ t.comments }}"</p>
                  </div>
                }
             </div>
          }
          @case ('clients') {
            <div class="section clients">
              <h2 class="section-header">
                <span class="cmd"><span class="cmd-prefix">$</span> ls ./clients</span>
                <button class="back-btn" (click)="navService.navigate('help')">[ .. ] return</button>
              </h2>
              <div class="clients-grid">
                @for (client of data.clients; track client.id) {
                  <div class="client-card fade-in" [style.animation-delay]="client.id * 100 + 'ms'">
                     <div class="client-logo">
                       <pre>{{ client.logoAscii }}</pre>
                     </div>
                     <div class="client-name">{{ client.name }}</div>
                  </div>
                }
              </div>
            </div>
          }
          @case ('contact') {
            <div class="section contact">
              <h2 class="section-header">
                <span class="cmd"><span class="cmd-prefix">$</span> ping -c 4 varanjith.com</span>
                <button class="back-btn" (click)="navService.navigate('help')">[ .. ] return</button>
              </h2>
              <div class="ping-stats fade-in">
                <div>PING varanjith.com (127.0.0.1): 56 data bytes</div>
                <br>
                <div>64 bytes from {{ data.contact.email }}: icmp_seq=0 ttl=64 time=0.045 ms</div>
                <div>64 bytes from {{ data.contact.phone }}: icmp_seq=1 ttl=64 time=0.045 ms</div>
                @if (data.contact.location) {
                  <div>64 bytes from {{ data.contact.location }}: icmp_seq=2 ttl=64 time=0.045 ms</div>
                }
                <br>
                <div class="social-block">
                  @for (link of data.contact.social; track link.url) {
                     <div><a [href]="link.url" target="_blank" class="social-link">CONNECT TO {{ link.platform | uppercase }}... <span class="success">OK</span></a></div>
                  }
                </div>
              </div>
            </div>
          }
          @case ('help') {
            <div class="section help">
              <h2 class="section-header">
                <span class="cmd"><span class="cmd-prefix">$</span> help</span>
              </h2>
              <p>GNU bash, version 5.1.16(1)-release (x86_64-pc-linux-gnu)</p>
              <p>These shell commands are defined internally.  Type 'help' to see this list.</p>
              <br>
              <ul class="command-list">
                <li><button (click)="navService.navigate('about')">> about</button> <span class="comment"># Display user profile</span></li>
                <li><button (click)="navService.navigate('skills')">> skills</button> <span class="comment"># Analyze technical competencies</span></li>
                <li><button (click)="navService.navigate('experience')">> experience</button> <span class="comment"># Print work history log</span></li>
                <li><button (click)="navService.navigate('education')">> education</button> <span class="comment"># List academic records</span></li>
                <li><button (click)="navService.navigate('clients')">> clients</button> <span class="comment"># View client history</span></li>
                <li><button (click)="navService.navigate('testimonials')">> testimonials</button> <span class="comment"># Read system logs/reviews</span></li>
                <li><button (click)="navService.navigate('contact')">> contact</button> <span class="comment"># Establish connection</span></li>
              </ul>
            </div>
          }
        }
      </div>
    } @else {
      <div class="loading">Booting system...</div>
    }
  `,
  styles: [`
    /* General Section Styles */
    .content-area {
      padding: 1em;
      height: 100%;
      overflow-y: auto;
      font-family: var(--font-stack);
    }
    .section-header {
      font-size: 1.2em;
      color: var(--font-color);
      margin-bottom: 1.5em;
      border-bottom: 1px dashed var(--secondary-color);
      padding-bottom: 0.5em;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cmd-prefix { color: var(--neon-green); margin-right: 0.5em; }
    
    .back-btn {
      background: transparent;
      border: 1px solid var(--secondary-color);
      color: var(--secondary-color);
      font-family: inherit;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 0.7em;
      border-radius: 4px;
      transition: all 0.2s;
    }
    .back-btn:hover {
      border-color: var(--ubuntu-orange);
      color: var(--ubuntu-orange);
      box-shadow: 0 0 5px var(--ubuntu-orange);
    }
    
    /* Animations */
    .fade-in {
      opacity: 0;
      animation: fadeInUp 0.5s ease forwards;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .blink { animation: blink 1s step-end infinite; }
    @keyframes blink { 50% { opacity: 0; } }

    /* About Section */
    .profile-header { display: flex; gap: 2em; align-items: center; margin-bottom: 2em; }
    .ascii-art pre { 
        font-size: 12px; 
        line-height: 12px; 
        font-weight: bold;
        background: linear-gradient(135deg, var(--neon-pink), #fff, var(--neon-blue));
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 10px rgba(255, 42, 109, 0.8));
        animation: gradientFlow 3s ease infinite;
        text-align: center;
    }
    .ascii-art {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 140px; /* Ensure generic spacing */
    }
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .name { color: var(--neon-pink); text-shadow: 0 0 5px var(--neon-pink); margin: 0; font-size: 2em;}
    .role { color: var(--neon-blue); margin-top: 0.5em; }
    .tagline { color: var(--ubuntu-orange); font-style: italic; border-left: 2px solid var(--ubuntu-orange); padding-left: 10px; }
    .btn { 
        display: inline-block; margin-top: 1em; color: var(--background-color); 
        background: var(--neon-green); padding: 5px 10px; text-decoration: none; font-weight: bold;
    }
    .btn:hover { background: #fff; box-shadow: 0 0 10px #fff; }

    /* Git Graph (Experience) */
    .git-graph { padding-left: 10px; border-left: 2px solid var(--secondary-color); position: relative; }
    .commit-node { display: flex; gap: 15px; margin-bottom: 2em; position: relative; }
    .graph-visual {
        display: flex; flex-direction: column; align-items: center; width: 20px;
        position: absolute; left: -21px; top: 0; bottom: -2em;
    }
    .dot { 
        width: 12px; height: 12px; background: var(--secondary-color); border-radius: 50%; 
        border: 2px solid var(--background-color); z-index: 2; margin-top: 5px;
    }
    .dot.latest { background: var(--neon-green); box-shadow: 0 0 8px var(--neon-green); }
    .dot.start { background: var(--ubuntu-orange); }
    
    .commit-header { margin-bottom: 5px; }
    .hash { color: var(--ubuntu-orange); font-weight: bold; margin-right: 10px; }
    .msg { color: #fff; font-weight: bold; }
    .commit-body p { color: #aaa; font-size: 0.9em; margin: 0; line-height: 1.4; }

    /* JSON Output (Education) */
    .json-output { font-family: monospace; }
    .key { color: var(--neon-blue); }
    .string { color: var(--ubuntu-orange); }
    .indent { margin-left: 20px; }

    /* Skills */
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1em; }
    .skill-row { display: flex; align-items: center; gap: 10px; font-family: monospace; }
    .skill-name { width: 120px; text-align: right; color: var(--neon-blue); }
    .ascii-progress { 
        position: relative; color: var(--secondary-color); overflow: hidden;
        width: 20ch; white-space: nowrap; 
    }
    .ascii-progress .filled { 
        position: absolute; top:0; left:0; color: var(--neon-green); overflow: hidden; 
        text-shadow: 0 0 5px var(--neon-green);
    }
    .percent { color: #fff; font-size: 0.8em; }

    /* Clients Section */
    .clients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5em;
    }
    .client-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--secondary-color);
      border-radius: 8px;
      padding: 1em;
      text-align: center;
      transition: all 0.3s ease;
      cursor: default;
    }
    .client-card:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--neon-green);
      box-shadow: 0 0 15px rgba(0, 255, 65, 0.2);
    }
    .client-logo pre {
      font-size: 10px;
      line-height: 10px;
      font-weight: bold;
      color: var(--neon-blue);
      margin-bottom: 1em;
      white-space: pre;
      overflow: hidden;
    }
    .client-card:hover .client-logo pre {
      color: var(--neon-pink);
      text-shadow: 0 0 5px var(--neon-pink);
    }
    .client-name {
      color: #fff;
      font-weight: bold;
      font-size: 0.9em;
    }

    /* Testimonials (Logs) */
    .log-entry { margin-bottom: 1.5em; font-family: monospace; font-size: 0.9em; border-left: 2px solid var(--ubuntu-purple); padding-left: 10px; }
    .log-date { color: var(--neon-green); margin-right: 10px; }
    .log-user { color: var(--neon-pink); font-weight: bold; }
    .log-role { color: #888; font-size: 0.85em; margin-left: 5px; }
    .log-msg { color: #ccc; margin-top: 5px; font-style: italic; }

    /* Contact & Help */
    .ping-stats { font-family: monospace; }
    .social-link { color: var(--neon-blue); text-decoration: none; display: block; margin-bottom: 5px; }
    .social-link:hover { color: #fff; text-shadow: 0 0 5px #fff; }
    .success { color: var(--neon-green); float: right; }
    
    .command-list button { 
        background: none; border: none; color: var(--neon-green); 
        font-family: inherit; font-size: inherit; cursor: pointer; padding: 0; margin-right: 10px;
    }
    .command-list button:hover { text-decoration: underline; text-shadow: 0 0 5px var(--neon-green); }
    .comment { color: #666; font-style: italic; }

    @media (max-width: 600px) {
       .profile-header { flex-direction: column; text-align: center; }
       .skills-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ResumeRendererComponent {
  navService = inject(NavigationService);
  private resumeService = inject(ResumeService);

  resume = toSignal(this.resumeService.getResume());
}
