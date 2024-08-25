import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is for login
    if (req.url.includes('/login')) {
      const { email, password } = req.body;

      // Call the login method from AuthService
      return this.authService.login(email, password).pipe(
        map(response => {
          if (response.success) {
            // If login is successful, you can handle the response here
            // For example, you could return a successful HttpResponse
            return new HttpResponse({ status: 200, body: { message: 'Login successful' } });
          } else {
            // Handle login failure (you might want to throw an error)
            throw new Error('Login failed');
          }
        }),
        catchError(err => {
          // Handle any errors that occur during the login process
          return of(new HttpResponse({ status: 401, body: { message: 'Unauthorized' } }));
        })
      );
    }

    // For other requests, pass them through to the next handler
    return next.handle(req);
  }
}
