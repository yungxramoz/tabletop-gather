import { JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { DetailPlanDto } from '../../models/detail-plan.dto';
import { EventOverviewComponent } from '../molecules/event-overview.component';
import { SelectGatheringComponent } from '../molecules/select-gathering.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-general',
  imports: [
    JsonPipe,
    NgIf,
    NbCardModule,
    EventOverviewComponent,
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
          *ngIf="!isOwner"
          [gatherings]="detailPlan.gatherings"
        >
        </tg-select-gathering>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventGeneralComponent {
  @Input({ required: true }) public detailPlan!: DetailPlanDto;
  @Input({ required: true }) public isOwner!: boolean | null;
}
