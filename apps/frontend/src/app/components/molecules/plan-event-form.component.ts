import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
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
      email: form.controls['title'].value,
      password: form.controls['eventInfo'].value,
    });
  }
}
