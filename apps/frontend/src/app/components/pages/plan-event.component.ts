import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStepperModule } from '@nebular/theme';
import { PlanEventDateComponent } from '../organisms/plan-event-date.component';
import { PlanEventFormComponent } from '../organisms/plan-event-form.component';

@Component({
  standalone: true,
  selector: 'tg-plan-event-stepper',
  imports: [NbStepperModule, PlanEventFormComponent, PlanEventDateComponent],
  template: `
    <nb-stepper [linear]="true">
      <nb-step label="Event">
        <ng-template nbStepLabel>Event</ng-template>
        <tg-plan-event-form></tg-plan-event-form>
      </nb-step>
      <nb-step label="Date">
        <ng-template nbStepLabel>Date</ng-template>
        <tg-plan-event-date></tg-plan-event-date>
      </nb-step>
      <nb-step label="Summary">
        <ng-template nbStepLabel>Summary</ng-template>
        <p>Summary</p>
      </nb-step>
    </nb-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventComponent {}
