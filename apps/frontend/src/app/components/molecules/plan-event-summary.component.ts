import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { LabelComponent } from '../atoms/label.component';
import { LazyImageComponent } from '../atoms/lazy-image.component';
import { VoidComponent } from '../atoms/void.component';
import { PlanEventFormValue } from '../pages/plan-event.component';
import { EventOverviewComponent } from './event-overview.component';

@Component({
  standalone: true,
  selector: 'tg-plan-event-summary',
  imports: [
    DatePipe,
    NgIf,
    NgFor,
    NbCardModule,
    NbButtonModule,
    VoidComponent,
    EventOverviewComponent,
    LabelComponent,
    LazyImageComponent,
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <ng-container *ngIf="event as ev; else nothingHereYet">
          <tg-event-overview [plan]="ev"></tg-event-overview>

          <button
            nbButton
            fullWidth
            status="primary"
            shape="semi-round"
            (click)="createEvent.emit(event!)"
          >
            Create Event
          </button>
        </ng-container>

        <ng-template #nothingHereYet>
          <tg-void message="Nothing here yet."></tg-void>
        </ng-template>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.Default, // Explicitly set to default, as we usually use OnPush
})
export class PlanEventSummaryComponent {
  @Input({ required: true }) public event!: PlanEventFormValue | null;
  @Output() public createEvent: EventEmitter<PlanEventFormValue> =
    new EventEmitter<PlanEventFormValue>();
}
