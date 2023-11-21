import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbStepperModule } from '@nebular/theme';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { Game } from '../../models/game.dto';
import { Plan } from '../../models/plan.dto';
import { PlanEventDatesFormComponent } from '../organisms/plan-event-dates-form.component';
import { PlanEventGeneralFormComponent } from '../organisms/plan-event-general-form.component';

@Component({
  standalone: true,
  selector: 'tg-plan-event-stepper',
  imports: [
    FormsModule,
    NbStepperModule,
    PlanEventGeneralFormComponent,
    PlanEventDatesFormComponent,
    CommonModule,
  ],
  template: `
    <nb-stepper>
      <nb-step label="Event">
        <ng-template nbStepLabel>Event</ng-template>
        <tg-plan-event-general-form
          [games]="mockGames"
        ></tg-plan-event-general-form>
      </nb-step>
      <nb-step label="Dates">
        <ng-template nbStepLabel>Dates</ng-template>
        <tg-plan-event-dates-form></tg-plan-event-dates-form>
      </nb-step>
      <nb-step label="Summary">
        <ng-template nbStepLabel>Summary</ng-template>
        <p>Summary</p>
      </nb-step>
    </nb-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventComponent implements AfterViewInit {
  @ViewChild(PlanEventDatesFormComponent)
  private datesFormComponent!: PlanEventDatesFormComponent;

  @ViewChild(PlanEventGeneralFormComponent)
  private generalFormComponent!: PlanEventGeneralFormComponent;

  public eventPlan$!: Observable<Plan>;

  public readonly mockGames: Game[] = [
    {
      name: 'Dungeons & Dragons',
      description: '',
      maxPlayer: 5,
      minPlayer: 2,
      imageUrl: '',
    },
    {
      name: 'Magic: The Gathering',
      description: '',
      maxPlayer: 5,
      minPlayer: 2,
      imageUrl: '',
    },
    {
      name: 'Warhammer',
      description: '',
      maxPlayer: 5,
      minPlayer: 2,
      imageUrl: '',
    },
  ];

  public ngAfterViewInit() {
    combineLatest([
      this.generalFormComponent.eventGeneralFormChange,
      this.datesFormComponent.eventDateFormChange,
    ])
      .pipe(
        map(([generalForm, datesForm]) => {
          return {
            ...generalForm,
            ...datesForm,
          };
        }),
        tap(console.log)
      )
      .subscribe();
  }
}
