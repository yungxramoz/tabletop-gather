import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbCardModule, NbIconModule, NbUserModule } from '@nebular/theme';
import { UserPlan } from '../../models/user/user-plan.dto';
import { GatheringDateComponent } from '../atoms/gathering-date.component';

@Component({
  standalone: true,
  selector: 'tg-user-card',
  imports: [
    NgFor,
    NgIf,
    NbCardModule,
    NbIconModule,
    NbUserModule,
    GatheringDateComponent,
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
                <tg-gathering-date
                  [date]="attendingGathering"
                ></tg-gathering-date>
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
