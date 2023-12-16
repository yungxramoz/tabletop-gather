import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbCardModule, NbIconModule, NbUserModule } from '@nebular/theme';
import { UserPlan } from '../../models/user/user-plan.dto';
import { GatheringDatePipe } from '../../pipes/gathering-date.pipe';

@Component({
  standalone: true,
  selector: 'tg-user-card',
  imports: [
    NgFor,
    NgIf,
    NbCardModule,
    NbIconModule,
    NbUserModule,
    GatheringDatePipe,
  ],
  template: `
    <nb-card>
      <nb-card-header>
        {{ user.fullName }}
      </nb-card-header>

      <nb-card-body>
        <div class="tg-flex-row tg-align-center tg-justify-start">
          <nb-user [name]="user.fullName" [onlyPicture]="true"></nb-user>
          <div class="tg-p-1"></div>
          <div>
            <p class="label">Can attend</p>
            <div class="tg-pt-1">
              <p *ngFor="let attendingGathering of user.attendingGatherings">
                {{ attendingGathering | gatheringDate }}
              </p>
            </div>
          </div>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input({ required: true }) public user!: UserPlan;
}
