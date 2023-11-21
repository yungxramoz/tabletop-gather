import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { VALIDATION_ERROR_MAPPING_OVERRIDE } from '../../resources/validation-errors.resources';
import { AutocompleteComponent } from '../molecules/autocomplete.component';
import { InputComponent } from '../atoms/input.component';
import { TextareaComponent } from '../atoms/textarea.component';

@Component({
  selector: 'tg-plan-event-general-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbSelectModule,
    InputComponent,
    TextareaComponent,
    AutocompleteComponent,
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
        <form class="form" #eventForm="ngForm" (submit)="getEvent(eventForm)">
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

          <tg-autocomplete
            ngModel
            required
            id="game"
            name="game"
            label="Game"
            [options]="options"
            placeholder="Game"
          ></tg-autocomplete>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventGeneralFormComponent {
  @Output()
  public eventInfoCreated: EventEmitter<unknown> = new EventEmitter<unknown>();

  public readonly options = [
    'Game 1',
    'Game 2',
    'Game 3',
    'asdd',
    'askld',
    '123',
    '1234',
    '12345',
    '123456',
    '1234567',
    '12345678',
    '123456789',
    '1234567890',
  ];

  public getEvent(form: NgForm) {
    this.eventInfoCreated.emit({
      title: form.controls['title'].value,
      eventInfo: form.controls['eventInfo'].value,
      playerLimit: form.controls['playerLimit'].value,
      games: form.controls['game'].value,
    });

    throw new Error('Not finished. Needs input (options) from api');
  }
}
