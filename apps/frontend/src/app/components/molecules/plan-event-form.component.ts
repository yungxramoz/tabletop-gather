import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { VALIDATION_ERROR_MAPPING_OVERRIDE } from '../../resources/validation-errors.resources';
import { InputComponent } from '../atoms/input.component';
import { TextareaComponent } from '../atoms/textarea.component';

@Component({
  selector: 'tg-plan-event-form',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    JsonPipe,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    InputComponent,
    TextareaComponent,
  ],
  providers: [
    {
      provide: VALIDATION_ERROR_MAPPING_OVERRIDE,
      useValue: {
        pattern: (fieldName: string) =>
          `${fieldName} must be between 1 and 100`,
      },
    },
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <form
          class="form"
          #getEventForm="ngForm"
          (submit)="getEvent(getEventForm)"
        >
          <tg-input
            ngModel
            required
            id="title"
            name="title"
            label="Title"
            placeholder="Game Night"
          ></tg-input>

          <tg-textarea
            ngModel
            required
            [rows]="4"
            id="eventInfo"
            name="eventInfo"
            label="Event Info"
            placeholder="Bring snacks 🥖"
          ></tg-textarea>

          <tg-input
            ngModel
            required
            pattern="^$|^([1-9]|[1-9][0-9]|[1][0][0])?"
            type="number"
            id="playerLimit"
            name="playerLimit"
            label="Player Limit"
            placeholder=""
          ></tg-input>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventFormComponent {
  @Output()
  public eventInfoCreated: EventEmitter<unknown> = new EventEmitter<unknown>();

  public getEvent(form: NgForm) {
    this.eventInfoCreated.emit({
      titl: form.controls['title'].value,
      eventInfo: form.controls['eventInfo'].value,
      playerLimit: form.controls['playerLimit'].value,
    });
  }
}
