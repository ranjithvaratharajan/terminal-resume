import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resume } from '../models/resume.model';
import { Observable, of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ResumeService {
    private http = inject(HttpClient);

    // Cache the Observable so we don't spam requests
    private resume$ = this.http.get<Resume>('/assets/resume.json').pipe(
        shareReplay(1),
        tap({
            error: (err) => console.error('Failed to load resume.json', err)
        }),
        catchError(err => {
            console.error('Critical Error: Resume Data Missing');
            return of(null as any); // Prevent crash, but UI will be empty
        })
    );

    getResume(): Observable<Resume> {
        return this.resume$;
    }
}
