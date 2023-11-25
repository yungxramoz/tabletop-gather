import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { DetailPlanDto } from '../../models/detail-plan.dto';
import { EventOverviewComponent } from '../molecules/event-overview.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-general',
  imports: [JsonPipe, NbCardModule, EventOverviewComponent],
  template: `
    <nb-card>
      <nb-card-body>
        <tg-event-overview
          [showOptions]="false"
          [plan]="detailPlan"
        ></tg-event-overview>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventGeneralComponent {
  @Input({ required: true }) public detailPlan!: DetailPlanDto;
}
