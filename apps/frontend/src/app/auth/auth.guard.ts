import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export const isAuthenticatedOrRedirectToLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.loginStatus;

  if (isLoggedIn) {
    return true;
  }

  router.navigate(['login']);

  return false;
};
