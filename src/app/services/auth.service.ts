// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Authentication state
  private loggedInSubject = new BehaviorSubject<boolean>(this.loggedIn); // Observable for authentication state

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedAuthState = localStorage.getItem('isLoggedIn');
      this.loggedIn = storedAuthState === 'true';
      this.loggedInSubject.next(this.loggedIn);
    }
  }

  login(email: string, password: string): Observable<{ success: boolean }> {
    if (email === 'user@demo.com' && password === '123456') {
      this.loggedIn = true;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('isLoggedIn', 'true');
      }
      this.loggedInSubject.next(this.loggedIn);
      return of({ success: true });
    } else {
      return of({ success: false });
    }
  }

  logout(): void {
    this.loggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
    }
    this.loggedInSubject.next(this.loggedIn);
    // Redirect to login page
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
}
