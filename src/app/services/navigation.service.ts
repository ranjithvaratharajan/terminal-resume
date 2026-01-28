import { Injectable, signal } from '@angular/core';

export type Section = 'about' | 'skills' | 'experience' | 'education' | 'testimonials' | 'contact' | 'help';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    readonly currentSection = signal<Section>('help');

    navigate(section: Section) {
        this.currentSection.set(section);
    }
}
