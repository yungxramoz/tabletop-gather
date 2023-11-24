import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NbButtonModule, NbStepperModule } from '@nebular/theme';
import { Observable, combineLatest, filter, map, startWith } from 'rxjs';
import { MOCK_GAME_DTOS_LARGE } from '../../mocks/game.mock';
import { CreatePlan } from '../../models/create-plan.dto';
import { Game } from '../../models/game.dto';
import { PlanService } from '../../services/plan.service';
import { get24HourTime } from '../../utils/date.utility';
import { PlanEventSummaryComponent } from '../molecules/plan-event-summary.component';
import {
  PlanEventDatesFormComponent,
  PlanEventDatesFormValue,
} from '../organisms/plan-event-dates-form.component';
import {
  PlanEventGeneralFormComponent,
  PlanEventGeneralFormValue,
} from '../organisms/plan-event-general-form.component';

export type PlanEventFormValue = PlanEventGeneralFormValue &
  PlanEventDatesFormValue;

@Component({
  standalone: true,
  selector: 'tg-plan-event',
  imports: [
    AsyncPipe,
    JsonPipe,
    FormsModule,
    NbButtonModule,
    NbStepperModule,
    PlanEventGeneralFormComponent,
    PlanEventDatesFormComponent,
    PlanEventSummaryComponent,
  ],
  template: `
    <nb-stepper>
      <nb-step label="Event" [completed]="eventGeneralFormValid$ | async">
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
        <tg-plan-event-summary
          [event]="newEvent$ | async"
          [disabled]="
            (eventGeneralFormValid$ | async) === false ||
            (eventDatesFormValid$ | async) === false
          "
          (createEvent)="onCreateEvent($event)"
        ></tg-plan-event-summary>
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

  public eventGeneralFormValid$!: Observable<boolean>;
  public eventDatesFormValid$!: Observable<boolean>;
  public newEvent$!: Observable<PlanEventFormValue>;

  public readonly mockGames: Game[] = MOCK_GAME_DTOS_LARGE;

  public constructor(
    private readonly planService: PlanService,
    private readonly router: Router
  ) {}

  public onCreateEvent(planEventFormValue: PlanEventFormValue) {
    const {
      gatherings: rawGatherings,
      game: rawGame,
      playerLimit: rawPlayerLimit,
      isPrivate: rawIsPrivate,
      name,
      description,
    } = planEventFormValue;

    const gatherings = rawGatherings.map((date) => ({
      date,
      startTime: get24HourTime(date),
    }));

    const gameId = rawGame[0]?.id;
    const isPrivate = (rawIsPrivate as unknown) === '' ? false : rawIsPrivate;
    const playerLimit = parseInt(rawPlayerLimit, 10);

    const createPlan: CreatePlan = {
      name,
      description,
      isPrivate,
      playerLimit,
      gatherings,
      gameId,
    };

    this.planService.createPlan(createPlan).subscribe((plan) => {
      console.log('Plan uploaded:', plan);
    });
    console.log('Plan created:', createPlan);
  }

  public ngAfterViewInit() {
    const generalFormValues$ =
      this.generalFormComponent.eventGeneralFormChange.pipe(
        filter((form) => form.valid),
        map((form) => form.value as PlanEventGeneralFormValue)
      );

    const datesFormValues$ = this.datesFormComponent.eventDateFormChange.pipe(
      filter((form) => form.valid),
      map((form) => form.value as PlanEventDatesFormValue)
    );

    this.eventGeneralFormValid$ =
      this.generalFormComponent.eventGeneralFormChange.pipe(
        map((form) => form.valid),
        startWith(false)
      );

    this.eventDatesFormValid$ =
      this.datesFormComponent.eventDateFormChange.pipe(
        map((form) => form.valid),
        startWith(false)
      );

    this.newEvent$ = combineLatest([generalFormValues$, datesFormValues$]).pipe(
      map(([generalForm, datesForm]) => {
        return {
          ...generalForm,
          ...datesForm,
        };
      })
    );

    this.newEvent$.subscribe();
  }
}
