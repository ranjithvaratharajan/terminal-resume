import { Injectable, signal } from '@angular/core';

export interface Theme {
    name: string;
    properties: {
        [key: string]: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    activeTheme = signal<string>('ubuntu');

    readonly themes: Record<string, Theme> = {
        ubuntu: {
            name: 'Ubuntu',
            properties: {
                '--primary-color': '#00ff41',
                '--secondary-color': '#5c5c5c',
                '--background-color': '#1a0b17',
                '--glass-bg': 'rgba(48, 10, 36, 0.85)',
                '--font-color': '#d1d5db',
                '--ubuntu-orange': '#E95420',
                '--ubuntu-purple': '#772953',
                '--neon-pink': '#ff2a6d',
                '--neon-blue': '#05d9e8',
                '--neon-green': '#00ff41',
                '--text-glow': '0 0 10px rgba(0, 255, 65, 0.5)'
            }
        },
        matrix: {
            name: 'The Matrix',
            properties: {
                '--primary-color': '#00ff41',
                '--secondary-color': '#0d3b0d',
                '--background-color': '#000000',
                '--glass-bg': 'rgba(0, 20, 0, 0.9)',
                '--font-color': '#00ff41',
                '--ubuntu-orange': '#008f11', /* Muted green override */
                '--ubuntu-purple': '#003b00',
                '--neon-pink': '#00ff41',     /* All green everything */
                '--neon-blue': '#008f11',
                '--neon-green': '#00ff41',
                '--text-glow': '0 0 8px rgba(0, 255, 65, 0.8)'
            }
        },
        amber: {
            name: 'Retro Amber',
            properties: {
                '--primary-color': '#ffb000',
                '--secondary-color': '#5c3a00',
                '--background-color': '#1a1000',
                '--glass-bg': 'rgba(26, 16, 0, 0.9)',
                '--font-color': '#ffb000',
                '--ubuntu-orange': '#cc8800',
                '--ubuntu-purple': '#332200',
                '--neon-pink': '#ffb000',
                '--neon-blue': '#cc8800',
                '--neon-green': '#ffb000',
                '--text-glow': '0 0 8px rgba(255, 176, 0, 0.6)'
            }
        },
        cyberpunk: {
            name: 'Cyberpunk',
            properties: {
                '--primary-color': '#ffee00',
                '--secondary-color': '#2e2157',
                '--background-color': '#0b1021',
                '--glass-bg': 'rgba(11, 16, 33, 0.85)',
                '--font-color': '#05d9e8',
                '--ubuntu-orange': '#ff2a6d',
                '--ubuntu-purple': '#791e94',
                '--neon-pink': '#ff2a6d',
                '--neon-blue': '#05d9e8',
                '--neon-green': '#ffee00',
                '--text-glow': '0 0 10px rgba(5, 217, 232, 0.6)'
            }
        },
        dracula: {
            name: 'Dracula',
            properties: {
                '--primary-color': '#bd93f9',
                '--secondary-color': '#44475a',
                '--background-color': '#282a36',
                '--glass-bg': 'rgba(40, 42, 54, 0.9)',
                '--font-color': '#f8f8f2',
                '--ubuntu-orange': '#ffb86c',
                '--ubuntu-purple': '#bd93f9',
                '--neon-pink': '#ff79c6',
                '--neon-blue': '#8be9fd',
                '--neon-green': '#50fa7b',
                '--text-glow': '0 0 8px rgba(189, 147, 249, 0.4)'
            }
        },
        macos: {
            name: 'MacOS Pro',
            properties: {
                '--primary-color': '#ffffff',
                '--secondary-color': '#333333',
                '--background-color': '#1e1e1e',
                '--glass-bg': 'rgba(30, 30, 30, 0.95)',
                '--font-color': '#f2f2f2',
                '--ubuntu-orange': '#007aff', /* Apple Blue */
                '--ubuntu-purple': '#5856d6',
                '--neon-pink': '#ff2d55',
                '--neon-blue': '#5ac8fa',
                '--neon-green': '#34c759',
                '--text-glow': 'none'
            }
        }
    };

    setTheme(themeName: string) {
        const theme = this.themes[themeName.toLowerCase()];
        if (!theme) return;

        this.activeTheme.set(themeName);

        // Apply CSS variables to root
        Object.keys(theme.properties).forEach(property => {
            document.documentElement.style.setProperty(property, theme.properties[property]);
        });
    }

    getCurrentTheme() {
        return this.activeTheme();
    }
}
