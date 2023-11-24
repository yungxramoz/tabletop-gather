import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { OverviewPlanDto } from '../../models/overview-plan.dto';

@Component({
  standalone: true,
  selector: 'tg-event-card',
  imports: [NbCardModule, NbButtonModule, NbIconModule],
  template: `
    <nb-card>
      <nb-card-header>
        <div class="tg-block">
          <p class="caption-2">
            {{ overviewPlanDto.gatheringDates.join(', ') }}
          </p>
        </div>
        {{ overviewPlanDto.name }}
      </nb-card-header>
      <nb-card-body>
        {{ overviewPlanDto.description }}
      </nb-card-body>
      <nb-card-footer>
        <div class="tg-flex-row tg-justify-end">
          <button
            nbButton
            ghost
            status="danger"
            shape="semi-round"
            (click)="delete.emit()"
          >
            <nb-icon icon="trash-2-outline"></nb-icon>
          </button>
          <div class="tg-m-1"></div>
          <button
            nbButton
            status="control"
            shape="semi-round"
            (click)="edit.emit()"
          >
            Edit
          </button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  @Input({ required: true }) public overviewPlanDto!: OverviewPlanDto;
  @Output() public delete: EventEmitter<void> = new EventEmitter();
  @Output() public edit: EventEmitter<void> = new EventEmitter();
}
