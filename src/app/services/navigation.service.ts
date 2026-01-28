import { Injectable, signal } from '@angular/core';

export type Section = 'about' | 'skills' | 'experience' | 'education' | 'testimonials' | 'contact';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    readonly currentSection = signal<Section>('about');

    navigate(section: Section) {
        this.currentSection.set(section);
    }
}
