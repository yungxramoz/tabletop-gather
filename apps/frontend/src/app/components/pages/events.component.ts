import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

@Component({
  standalone: true,
  selector: 'tg-events',
  imports: [NbCardModule],
  template: `
    <nb-card>
      <nb-card-header>Events</nb-card-header>
      <nb-card-body>
        <p>Welcome to the events!</p>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {}
