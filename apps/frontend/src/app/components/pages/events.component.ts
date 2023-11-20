import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';

@Component({
  standalone: true,
  selector: 'tg-events',
  imports: [NbCardModule, NbButtonModule, NbIconModule],
  template: `
    <nb-card>
      <button nbButton status="primary" outline>
        <nb-icon icon="plus-outline"></nb-icon>
        Create Event
      </button>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {}
