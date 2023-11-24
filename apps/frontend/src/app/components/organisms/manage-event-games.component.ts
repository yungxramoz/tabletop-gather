import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { DetailPlanDto } from '../../models/detail-plan.dto';

@Component({
  standalone: true,
  selector: 'tg-manage-event-games',
  imports: [JsonPipe, NbCardModule],
  template: `
    <nb-card>
      <nb-card-body>
        {{ detailPlan | json }}
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageEventGamesComponent {
  @Input({ required: true }) public detailPlan!: DetailPlanDto | null;
}
