import { Route } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard.component';
import { LoginComponent } from './components/pages/login.component';
import { SampleDesignComponent } from './components/pages/sample-design.component';
import { UsersComponent } from './components/pages/users.component';
import { isAuthenticatedOrRedirectToLogin } from './guards/auth.guard';

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
