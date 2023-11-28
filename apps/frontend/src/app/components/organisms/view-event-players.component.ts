import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USER_DTOS } from '../../mocks/user.mock';
import { DateTimeGatheringDto } from '../../models/gathering/date-time-gathering.dto';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';
import { UserPlan } from '../../models/user/user-plan.dto';
import { UserCardComponent } from '../molecules/user-card.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-players',
  imports: [NgFor, NgIf, AsyncPipe, UserCardComponent],
  template: `
    <ng-container *ngFor="let user of users$ | async">
      <tg-user-card [user]="user"></tg-user-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventPlayersComponent implements OnInit {
  @Input({ required: true }) public detailPlan!: DetailPlanDto | null;

  // TODO: Get from API
  public users$!: Observable<UserPlan[]>;

  public ngOnInit() {
    this.users$ = of(
      MOCK_USER_DTOS.map((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;
        const attendingGatherings = this.detailPlan?.gatherings
          .slice(
            0,
            Math.ceil(Math.random() * this.detailPlan.gatherings.length)
          )
          .map((gathering) => {
            delete (gathering as any).participantCount;
            return gathering as DateTimeGatheringDto;
          });

        return <UserPlan>{ fullName, attendingGatherings };
      })
    );
  }
}
