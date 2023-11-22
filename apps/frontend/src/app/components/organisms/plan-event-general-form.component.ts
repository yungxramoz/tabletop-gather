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
import { Game } from '../../models/game.dto';
import { Plan } from '../../models/plan.dto';
import { ModelFormGroup } from '../../utils/types';
import { InputComponent } from '../atoms/input.component';
import { TextareaComponent } from '../atoms/textarea.component';
import { AutocompleteComponent } from '../molecules/autocomplete.component';

type PlanWithUnmappedGame = Omit<Partial<Plan>, 'game'> & {
  game: [Game];
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
            id="name"
            name="name"
            label="Title"
            placeholder="Game Night"
          ></tg-input>

          <tg-textarea
            ngModel
            required
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

          <tg-autocomplete
            ngModel
            id="game"
            name="game"
            label="Game"
            mode="single"
            [options]="games"
            [optionSelector]="gameKeySelector"
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
    ModelFormGroup<PlanWithUnmappedGame>
  > = new EventEmitter<ModelFormGroup<PlanWithUnmappedGame>>();

  public gameKeySelector = (game: Game) => game.name;

  public ngAfterViewInit() {
    this.ngForm.form.valueChanges.subscribe(() => {
      if (this.ngForm.form.valid)
        this.eventGeneralFormChange.emit(this.ngForm.form);
    });
  }
}
