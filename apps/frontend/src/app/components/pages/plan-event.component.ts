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
import { Observable, combineLatest, map } from 'rxjs';
import { ROUTE_VIEW_EVENT } from '../../constants';
import { Game } from '../../models/game/game.dto';
import { CreatePlan } from '../../models/plan/create-plan.dto';
import { GameService } from '../../services/game.service';
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
    <div class="tg-flex-col tg-justify-between tg-full">
      <nb-stepper #stepper class="tg-full">
        <nb-step label="Event">
          <ng-template nbStepLabel>Event</ng-template>
          <tg-plan-event-general-form
            [games]="games$ | async"
          ></tg-plan-event-general-form>
        </nb-step>

        <nb-step label="Dates">
          <ng-template nbStepLabel>Dates</ng-template>
          <tg-plan-event-dates-form></tg-plan-event-dates-form>
        </nb-step>

        <nb-step label="Summary">
          <ng-template nbStepLabel>Summary</ng-template>
          <tg-plan-event-summary
            [event]="planEventValue$ | async"
            (createEvent)="onCreateEvent($event)"
          ></tg-plan-event-summary>
        </nb-step>
      </nb-stepper>

      <div class="tg-flex-row tg-justify-end tg-m-4">
        <button
          nbButton
          ghost
          status="control"
          shape="semi-round"
          [disabled]="
            ((stepper.stepChange | async) ?? { index: 0 }).index === 0
          "
          (click)="stepper.previous()"
        >
          Previous
        </button>
        <div class="tg-m-1"></div>
        <button
          nbButton
          status="primary"
          shape="semi-round"
          type="submit"
          [disabled]="(stepper.stepChange | async)?.index === 2"
          (click)="stepper.next()"
        >
          Next
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventComponent implements AfterViewInit {
  @ViewChild(PlanEventDatesFormComponent)
  private datesFormComponent!: PlanEventDatesFormComponent;
  @ViewChild(PlanEventGeneralFormComponent)
  private generalFormComponent!: PlanEventGeneralFormComponent;

  public planEventValue$!: Observable<PlanEventFormValue | null>;
  public readonly games$: Observable<Game[]> = this.gameService.getAllMyGames();

  public constructor(
    private readonly planService: PlanService,
    private readonly gameService: GameService,
    private readonly router: Router
  ) {}

  public onCreateEvent(planEventFormValue: PlanEventFormValue) {
    const createPlan = this.mapToCreatePlan(planEventFormValue);

    this.planService.createPlan(createPlan).subscribe((planId) => {
      this.router.navigate(['/' + ROUTE_VIEW_EVENT, planId]);
    });
  }

  public ngAfterViewInit() {
    this.planEventValue$ = combineLatest([
      this.generalFormComponent.eventGeneralFormChange,
      this.datesFormComponent.eventDateFormChange,
    ]).pipe(
      map(([generalForm, datesForm]) => {
        if (generalForm.valid && datesForm.valid) {
          return {
            ...(generalForm.value as PlanEventGeneralFormValue),
            ...(datesForm.value as PlanEventDatesFormValue),
          } as PlanEventFormValue;
        }
        return null;
      })
    );

    this.planEventValue$.subscribe();
  }

  private mapToCreatePlan(planEventFormValue: PlanEventFormValue): CreatePlan {
    // Some values need to be mapped to fit the CreatePlan Dto
    // These values are destructured to a variable prefixed with 'raw'
    const {
      gatherings: rawGatherings,
      game: rawGame,
      playerLimit: rawPlayerLimit,
      isPrivate: rawIsPrivate,
      name,
      description,
    } = planEventFormValue;

    // Extract the time as a 24 hour time string
    const gatherings = rawGatherings.map((date) => ({
      date,
      startTime: get24HourTime(date),
    }));

    // Since 'game' comes from an autocomplete, it is an array of games
    const gameId = rawGame[0]?.id;

    // 'isPrivate' is a boolean, but the form returns a string if it was not set.
    // This is because radio buttons are used for this field - they use strings as values.
    const isPrivate = (rawIsPrivate as unknown) === '' ? false : rawIsPrivate;

    // 'playerLimit' is a number, but the form returns a numeric string.
    const playerLimit = parseInt(rawPlayerLimit, 10);

    const createPlan: CreatePlan = {
      name,
      description,
      isPrivate,
      playerLimit,
      gatherings,
      gameId,
    };

    return createPlan;
  }
}
