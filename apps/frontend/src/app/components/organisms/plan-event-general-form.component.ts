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
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { MaxValidatorDirective } from '../../directives/max-validator.directive';
import { MinValidatorDirective } from '../../directives/min-validator.directive';
import { InputComponent } from '../atoms/input.component';
import { TextareaComponent } from '../atoms/textarea.component';
import { AutocompleteComponent } from '../molecules/autocomplete.component';

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
    MinValidatorDirective,
    MaxValidatorDirective,
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <form #eventGeneralForm="ngForm">
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
            [tgMinValidator]="1"
            [tgMaxValidator]="100"
            type="number"
            id="playerLimit"
            name="playerLimit"
            label="Player Limit"
            placeholder="1"
          ></tg-input>

          <tg-autocomplete
            ngModel
            id="game"
            name="game"
            label="Game"
            mode="single"
            [options]="options"
            placeholder="Select a game"
          ></tg-autocomplete>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventGeneralFormComponent implements AfterViewInit {
  @ViewChild('eventGeneralForm') public readonly ngForm!: NgForm;

  @Output() public eventGeneralFormChange: EventEmitter<any> =
    new EventEmitter<any>();

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

  public ngAfterViewInit() {
    this.ngForm.form.valueChanges.subscribe((value) => {
      if (this.ngForm.form.valid) {
        this.eventGeneralFormChange.emit(value);
      }
    });
  }
}
