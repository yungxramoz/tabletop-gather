import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { ROUTE_PLAN_EVENT } from '../../constants';

@Component({
  standalone: true,
  selector: 'tg-events',
  imports: [NbCardModule, NbButtonModule, NbIconModule, RouterModule],
  template: `
    <nb-card>
      <button nbButton status="primary" [routerLink]="[routePlanEvent]" outline>
        <nb-icon icon="plus-outline"></nb-icon>
        Create Event
      </button>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  public readonly routePlanEvent = '/' + ROUTE_PLAN_EVENT;
}
