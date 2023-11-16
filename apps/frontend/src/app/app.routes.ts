import { Route } from '@angular/router';
import { isAuthenticatedOrRedirectToLogin } from './auth/auth.guard';
import { DashboardComponent } from './components/organisms/dashboard.component';
import { LoginComponent } from './components/organisms/login.component';
import { UsersComponent } from './components/organisms/users.component';
import { SampleDesignComponent } from './components/pages/sample-design.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user-management',
    component: UsersComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
  {
    path: 'design',
    component: SampleDesignComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
];
