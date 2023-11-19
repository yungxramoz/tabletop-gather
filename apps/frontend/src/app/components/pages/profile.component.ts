import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import {
  ROUTE_DESIGN,
  ROUTE_USER_MANAGEMENT,
} from 'apps/frontend/src/constants';

@Component({
  standalone: true,
  selector: 'tg-profile',
  imports: [NbCardModule, NbButtonModule, RouterModule],
  template: `
    <nb-card>
      <nb-card-header>Profile</nb-card-header>
      <nb-card-body>
        <button nbButton [routerLink]="[routeDesign]">Design</button>
        <button nbButton class="tg-mx-2" [routerLink]="[routeUserManagement]">
          Users
        </button>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public readonly routeDesign = '/' + ROUTE_DESIGN;
  public readonly routeUserManagement = '/' + ROUTE_USER_MANAGEMENT;
}
