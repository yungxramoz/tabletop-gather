import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { Plan } from '../../models/plan.dto';
import { DatepickerComponent } from '../molecules/datepicker.component';

@Component({
  selector: 'tg-plan-event-dates-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NbCardModule, DatepickerComponent],
  template: `
    <nb-card>
      <nb-card-body>
        <form #eventDateForm="ngForm">
          <tg-datepicker
            ngModel
            required
            id="gatherings"
            name="gatherings"
            label="Event Dates"
            placeholder="Select some dates"
            [min]="minAllowedDate"
          ></tg-datepicker>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventDatesFormComponent implements AfterViewInit {
  @ViewChild('eventDateForm') public readonly ngForm!: NgForm;

  @Output() public eventDateFormChange: EventEmitter<Partial<Plan>> =
    new EventEmitter<Partial<Plan>>();

  public readonly minAllowedDate = new Date();

  public ngAfterViewInit() {
    this.ngForm.form.valueChanges.subscribe(() => {
      if (this.ngForm.form.valid) {
        this.eventDateFormChange.emit(this.ngForm.form.value);
      }
    });
  }
}
