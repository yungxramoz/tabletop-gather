import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetailPlan } from '../../models/detail-plan.dto';

@Component({
  standalone: true,
  selector: 'tg-select-gathering',
  imports: [NgFor, FormsModule],
  template: `
    <div *ngFor="let gathering of gatherings">
      <input
        ngModel
        type="radio"
        name="gathering"
        value="{{ gathering }}"
        id="{{ gathering }}"
      />
      <label for="{{ gathering }}">{{ gathering }}</label>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGatheringComponent {
  @Input({ required: true }) public gatherings!: DetailPlan['gatherings'];
}
