import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { MaxValidatorDirective } from '../../directives/max-validator.directive';
import { MinValidatorDirective } from '../../directives/min-validator.directive';
import { Game, GameDto } from '../../models/game.dto';
import { ModelFormGroup } from '../../utils/types';
import { InputComponent } from '../atoms/input.component';
import { TextareaComponent } from '../atoms/textarea.component';
import { ToggleComponent } from '../atoms/toggle.component';
import { AutocompleteComponent } from '../molecules/autocomplete.component';

export type PlanEventGeneralFormValue = {
  name: string;
  description: string;
  isPrivate: boolean;
  playerLimit: string;
  game: [GameDto];
};

@Component({
  selector: 'tg-plan-event-general-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbSelectModule,
    InputComponent,
    ToggleComponent,
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
            minlength="3"
            maxlength="255"
            id="name"
            name="name"
            label="Title"
            placeholder="Game Night"
          ></tg-input>

          <tg-textarea
            ngModel
            required
            minlength="3"
            maxlength="2048"
            [rows]="4"
            id="description"
            name="description"
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

          <tg-toggle
            ngModel
            id="isPrivate"
            name="isPrivate"
            label="Visibility"
            description="Privat event?"
          ></tg-toggle>

          <tg-autocomplete
            ngModel
            id="game"
            name="game"
            label="Game"
            mode="single"
            [options]="games"
            [optionSelector]="gameKeySelector"
            [optionImageUrlSelector]="gameImageUrlSelector"
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

  @Input({ required: true }) public games!: Game[];
  @Output() public eventGeneralFormChange: EventEmitter<
    ModelFormGroup<PlanEventGeneralFormValue>
  > = new EventEmitter<ModelFormGroup<PlanEventGeneralFormValue>>();

  public gameKeySelector = (game: Game) => game.name;
  public gameImageUrlSelector = (game: Game) => game.imageUrl;

  public ngAfterViewInit() {
    this.ngForm.form.valueChanges.subscribe(() => {
      if (this.ngForm.form.valid)
        this.eventGeneralFormChange.emit(this.ngForm.form);
    });
  }
}
