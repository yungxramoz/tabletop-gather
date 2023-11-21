import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { DatepickerComponent } from '../molecules/datepicker.component';

@Component({
  selector: 'tg-plan-event-dates-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NbCardModule, DatepickerComponent],
  template: `
    <nb-card>
      <nb-card-body>
        <form
          class="form"
          #getEventDateForm="ngForm"
          (submit)="getEventDates(getEventDateForm)"
        >
          <tg-datepicker
            ngModel
            required
            id="eventDates"
            name="eventDates"
            label="Event Dates"
            placeholder="Select some dates"
            [min]="min"
          ></tg-datepicker>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventDatesFormComponent {
  @Output()
  public eventDatesCreated: EventEmitter<unknown> = new EventEmitter<unknown>();

  public min = new Date();

  public getEventDates(form: NgForm) {
    this.eventDatesCreated.emit({
      eventDates: form.controls['eventDates'].value,
    });

    throw new Error('Not finished yet');
  }
}
