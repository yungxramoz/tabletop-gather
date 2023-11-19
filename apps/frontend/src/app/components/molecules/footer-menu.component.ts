import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
import { ROUTE_COLLECTION, ROUTE_EVENTS, ROUTE_PROFILE } from '../../constants';

@Component({
  standalone: true,
  selector: 'tg-footer-menu',
  imports: [
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbButtonGroupModule,
    RouterModule,
  ],
  template: `
    <nb-button-group ghost size="medium" fullWidth>
      <button nbButton status="control" [routerLink]="[routeEvents]">
        <nb-icon icon="calendar-outline"></nb-icon>
        Events
      </button>
      <button nbButton status="control" [routerLink]="[routeCollection]">
        <nb-icon icon="layers-outline"></nb-icon>
        Collection
      </button>
      <button nbButton status="control" [routerLink]="[routeProfile]">
        <nb-icon icon="person-outline"></nb-icon>
        Profile
      </button>
    </nb-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterMenuComponent {
  public readonly routeEvents = '/' + ROUTE_EVENTS;
  public readonly routeCollection = '/' + ROUTE_COLLECTION;
  public readonly routeProfile = '/' + ROUTE_PROFILE;
}
