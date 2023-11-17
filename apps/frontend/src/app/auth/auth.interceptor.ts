import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Interceptor that adds the Authorization header to all requests if the user is authenticated.
 * The Authorization header contains the JWT token, retrieved from the {@link AuthService}.
 *
 * @see {@link AuthService}
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private readonly authService: AuthService) {}

  /**
   * @inheritdoc
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
