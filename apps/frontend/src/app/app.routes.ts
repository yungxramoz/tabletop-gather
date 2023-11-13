import { Route } from '@angular/router';
import { UserManagementComponent } from './components/organisms/user-management.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-management',
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
  },
];
