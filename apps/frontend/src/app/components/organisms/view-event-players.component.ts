import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';
import { UserPlan } from '../../models/user/user-plan.dto';
import { UserCardComponent } from '../molecules/user-card.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-players',
  imports: [NgFor, NgIf, UserCardComponent],
  template: `
    <ng-container *ngFor="let user of attendees">
      <tg-user-card [user]="user"></tg-user-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventPlayersComponent {
  @Input({ required: true }) public detailPlan!: DetailPlanDto | null;

  @Input({ required: true }) public attendees!: UserPlan[] | null;
}
