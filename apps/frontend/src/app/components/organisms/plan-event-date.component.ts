import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
} from '@nebular/theme';
import { InputComponent } from '../atoms/input.component';
import { TextareaComponent } from '../atoms/textarea.component';

@Component({
  selector: 'tg-plan-event-date',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbDatepickerModule,
    InputComponent,
    TextareaComponent,
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <form
          class="form"
          #getEventDateForm="ngForm"
          (submit)="getEventDate(getEventDateForm)"
        >
          <div class="tg-p-1">
            <label class="label" for="date-picker">Pick Dates</label>
          </div>
          <input
            fullWidth
            nbInput
            id="date-picker"
            placeholder="Pick Date"
            [nbDatepicker]="picker"
          />
          <nb-datepicker #picker [min]="min"></nb-datepicker>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventDateComponent {
  @Output()
  public eventDateCreated: EventEmitter<unknown> = new EventEmitter<unknown>();

  public min = new Date();

  public getEventDate(form: NgForm) {
    this.eventDateCreated.emit({});

    throw new Error('Not implemented');
  }
}
