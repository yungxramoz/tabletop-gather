import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Route guard that checks if the user is authenticated, but not if the user is **authorized**.
 *
 * @returns {ReturnType<CanActivateFn>} - A function that returns true if the user is authenticated, false otherwise
 */
export const isAuthenticatedOrRedirectToLogin: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.loginStatus) {
    return true;
  }

  router.navigate(['login']);
  return false;
};
