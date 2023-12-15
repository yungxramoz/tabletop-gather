import { JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { DetailGatheringDto } from '../../models/gathering/detail-gathering.dto';
import { OverviewGatheringDto } from '../../models/gathering/overview-gathering.dto';
import { UpsertGatheringDto } from '../../models/gathering/upsert-gathering.dto';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';
import { GatheringDateComponent } from '../atoms/gathering-date.component';
import { EventOverviewComponent } from '../molecules/event-overview.component';
import { SelectGatheringComponent } from '../molecules/select-gathering.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-general',
  imports: [
    JsonPipe,
    NgIf,
    NgFor,
    NbCardModule,
    EventOverviewComponent,
    GatheringDateComponent,
    SelectGatheringComponent,
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <tg-event-overview
          [showOptions]="false"
          [plan]="detailPlan"
        ></tg-event-overview>

        <tg-select-gathering
          *ngIf="!isOwner; else selectGatherings"
          [gatherings]="detailPlan.gatherings"
          [alreadyAttending]="myGatheringsForThisPlan"
          (gatheringUpserted)="gatheringUpserted.emit($event)"
        >
        </tg-select-gathering>
        <ng-template #selectGatherings>
          <p class="label">Options</p>
          <div class="tg-pt-1">
            <p *ngFor="let gathering of sortGatherings(detailPlan.gatherings)">
              <tg-gathering-date [date]="gathering"></tg-gathering-date> -
              <i>{{ gathering.participantCount }} Participants</i>
            </p>
          </div>
        </ng-template>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventGeneralComponent {
  @Input({ required: true }) public detailPlan!: DetailPlanDto;
  @Input({ required: true }) public isOwner!: boolean | null;
  @Input({ required: true }) public myGatheringsForThisPlan!:
    | OverviewGatheringDto[]
    | null;

  @Output() public readonly gatheringUpserted: EventEmitter<
    UpsertGatheringDto[]
  > = new EventEmitter<UpsertGatheringDto[]>();

  public sortGatherings(gatherings: DetailGatheringDto[]) {
    return gatherings.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;

      return 0;
    });
  }
}
