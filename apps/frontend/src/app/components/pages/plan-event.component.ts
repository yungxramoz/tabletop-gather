import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbStepperModule } from '@nebular/theme';
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
  ],
  template: `
    <nb-stepper>
      <nb-step label="Event">
        <ng-template nbStepLabel>Event</ng-template>
        <tg-plan-event-general-form
          (eventGeneralFormChange)="onEventGeneralFormChange($event)"
        ></tg-plan-event-general-form>
      </nb-step>
      <nb-step label="Date">
        <ng-template nbStepLabel>Date</ng-template>
        <tg-plan-event-dates-form
          (eventDatesFormChange)="onEventDatesFormChange($event)"
        ></tg-plan-event-dates-form>
      </nb-step>
      <nb-step label="Summary">
        <ng-template nbStepLabel>Summary</ng-template>
        <p>Summary</p>
      </nb-step>
    </nb-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEventComponent {
  public onEventDatesFormChange(event: any) {
    console.log(event);
  }

  public onEventGeneralFormChange(event: any) {
    console.log(event);
  }
}
