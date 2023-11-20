import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStepperModule } from '@nebular/theme';
import { PlanEventFormComponent } from '../molecules/plan-event-form.component';

@Component({
  standalone: true,
  selector: 'tg-plan-event-stepper',
  imports: [NbStepperModule, PlanEventFormComponent],
  template: `
    <nb-stepper [linear]="true" class="tg-m-4">
      <nb-step label="Event">
        <ng-template nbStepLabel>Event</ng-template>
        <tg-plan-event-form></tg-plan-event-form>
      </nb-step>
      <nb-step label="Date">
        <ng-template nbStepLabel>Date</ng-template>
        <p>Date</p>
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
