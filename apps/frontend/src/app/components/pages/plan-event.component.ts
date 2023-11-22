import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbStepperModule } from '@nebular/theme';
import { Observable, combineLatest, filter, map, startWith } from 'rxjs';
import { CreatePlan } from '../../models/create-plan.dto';
import { Game } from '../../models/game.dto';
import { PlanEventSummaryComponent } from '../molecules/plan-event-summary';
import { PlanEventDatesFormComponent } from '../organisms/plan-event-dates-form.component';
import { PlanEventGeneralFormComponent } from '../organisms/plan-event-general-form.component';

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
  public newEvent$!: Observable<CreatePlan>;

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

  public onCreateEvent(createPlan: CreatePlan) {
    console.log('Plan created:', createPlan);
  }

  public ngAfterViewInit() {
    const generalFormValues$ =
      this.generalFormComponent.eventGeneralFormChange.pipe(
        filter((form) => form.valid),
        map((form) => form.value)
      );

    const datesFormValues$ = this.datesFormComponent.eventDateFormChange.pipe(
      filter((form) => form.valid),
      map((form) => form.value)
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
        // Manual mapping of form values to PlanDto
        const gatherings = (datesForm.gatherings ?? []).map(
          (date) =>
            <CreatePlan['gatherings'][number]>{
              date,
              startTime: date.toLocaleTimeString(),
            }
        );

        // Manual mapping of form values to PlanDto
        const game = (generalForm.game ?? [])[0];

        return {
          ...generalForm,
          game,
          gatherings,
        } as CreatePlan;
      })
    );

    this.newEvent$.subscribe();
  }
}
