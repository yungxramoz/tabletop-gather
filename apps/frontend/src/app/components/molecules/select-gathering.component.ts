import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbCheckboxModule } from '@nebular/theme';
import { DetailPlan } from '../../models/plan/detail-plan.dto';
import { GatheringDateComponent } from '../atoms/gathering-date.component';

@Component({
  standalone: true,
  selector: 'tg-select-gathering',
  imports: [NgFor, FormsModule, NbCheckboxModule, GatheringDateComponent],
  template: `
    <div *ngFor="let gathering of gatherings; index as i">
      <nb-checkbox
        status="primary"
        (checkedChange)="updateGatheringEnrollment(i)"
      >
        <tg-gathering-date [date]="gathering"></tg-gathering-date>
        <p>
          <i>{{ gathering.participantCount }} Participants</i>
        </p>
      </nb-checkbox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGatheringComponent {
  @Input({ required: true }) public gatherings!: DetailPlan['gatherings'];

  public updateGatheringEnrollment(index: number) {
    // TODO: Continue here when the endpoint is ready
    console.log(index);
  }
}
