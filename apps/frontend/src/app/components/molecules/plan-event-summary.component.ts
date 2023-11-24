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
import { PlanEventFormValue } from '../pages/plan-event.component';

@Component({
  standalone: true,
  selector: 'tg-plan-event-summary',
  imports: [
    DatePipe,
    NgIf,
    NgFor,
    NbCardModule,
    NbButtonModule,
    LabelComponent,
    LazyImageComponent,
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <ng-container *ngIf="event as ev; else nothingHereYet">
          <div class="tg-mb-2">
            <tg-label label="Title"></tg-label>
            <p class="tg-p-1">{{ ev.name }}</p>
            <tg-label label="Event Info"></tg-label>
            <p class="tg-p-1">{{ ev.description }}</p>
            <tg-label label="Visibility"></tg-label>
            <p class="tg-p-1">{{ ev.isPrivate ? 'Private' : 'Public' }}</p>
          </div>

          <div class="tg-my-2">
            <label class="label">Options</label>
            <div class="tg-p-1">
              <p *ngFor="let gathering of ev.gatherings">
                - {{ gathering | date : 'shortDate' }} at
                {{ gathering | date : 'shortTime' }}
              </p>
            </div>
          </div>

          <div class="tg-my-2">
            <label class="label">Player Limit</label>
            <p class="tg-p-1">{{ ev.playerLimit }}</p>
          </div>

          <div *ngIf="ev.game[0] as game" class="tg-my-2">
            <label class="label">Game</label>
            <div class="tg-flex-row tg-justify-start">
              <tg-lazy-image
                [src]="game.imageUrl"
                class="tg-mr-1"
              ></tg-lazy-image>
              <p class="tg-p-1">{{ game.name }}</p>
            </div>
          </div>
        </ng-container>

        <button
          nbButton
          fullWidth
          status="primary"
          shape="semi-round"
          [disabled]="disabled"
          (click)="createEvent.emit(event!)"
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
  @Input({ required: true }) public event!: PlanEventFormValue | null;
  @Output() public createEvent: EventEmitter<PlanEventFormValue> =
    new EventEmitter<PlanEventFormValue>();
}
