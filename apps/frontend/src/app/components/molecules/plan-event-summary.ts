import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { Plan } from '../../models/plan.dto';

@Component({
  standalone: true,
  selector: 'tg-plan-event-summary',
  imports: [DatePipe, NgIf, NgFor, NbCardModule, NbButtonModule],
  template: `
    <nb-card>
      <nb-card-body>
        <ng-container *ngIf="event as ev; else nothingHereYet">
          <div class="tg-mb-2">
            <h4>{{ ev.name }}</h4>
            <p>{{ ev.description }}</p>
          </div>

          <div class="tg-my-2">
            <p><strong>Options</strong></p>
            <div class="tg-m-1">
              <p *ngFor="let gathering of ev.gatherings">
                - {{ gathering.date | date : 'shortDate' }} at
                {{ gathering.startTime }}
              </p>
            </div>
          </div>

          <div class="tg-my-2 tg-flex-row">
            <p><strong>Player Limit</strong></p>
            <p>{{ ev.playerLimit }}</p>
          </div>

          <div *ngIf="ev.game as game" class="tg-my-2 tg-flex-row">
            <p><strong>Game</strong></p>
            <p>{{ game.name }}</p>
          </div>
        </ng-container>
        <button
          nbButton
          fullWidth
          status="primary"
          shape="semi-round"
          [disabled]="disabled"
          (click)="createEvent.emit()"
        >
          Create Event
        </button>
        <ng-template #nothingHereYet>
          <div class="tg-m-4 tg-flex-row tg-justify-around">
            <p class="tg-text-hint"><i>Nothing here yet.</i></p>
          </div>
        </ng-template>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.Default, // Explicitly set to default, as we usually use OnPush
})
export class PlanEventSummaryComponent {
  @Input() public disabled = false;

  @Input({ required: true }) public event!: Plan | null;

  @Output() public createEvent: EventEmitter<void> = new EventEmitter<void>();
}
