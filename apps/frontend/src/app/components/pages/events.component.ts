import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
} from '@nebular/theme';
import { ROUTE_MANAGE_EVENT, ROUTE_PLAN_EVENT } from '../../constants';
import { PlanService } from '../../services/plan.service';
import { VoidComponent } from '../atoms/void.component';
import { EventCardComponent } from '../molecules/event-card.component';

@Component({
  standalone: true,
  selector: 'tg-events',
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbIconModule,
    RouterModule,
    EventCardComponent,
    VoidComponent,
  ],
  template: `
    <nb-card>
      <button
        nbButton
        outline
        status="primary"
        shape="semi-round"
        [routerLink]="[routePlanEvent]"
      >
        <nb-icon icon="plus-outline"></nb-icon>
        Create Event
      </button>
    </nb-card>

    <ng-container *ngIf="myPlans$ | async as myPlans; else noPrivatePlans">
      <ng-container *ngIf="myPlans.length > 0; else noPrivatePlans">
        <tg-event-card
          *ngFor="let plan of myPlans"
          [overviewPlanDto]="plan"
          (edit)="editMyEvent(plan.id)"
          (delete)="deleteMyEvent(plan.id)"
        >
        </tg-event-card>
      </ng-container>
    </ng-container>
    <ng-template #noPrivatePlans>
      <nb-card-body>
        <tg-void message="You have no private events"></tg-void>
      </nb-card-body>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  public readonly routePlanEvent = '/' + ROUTE_PLAN_EVENT;
  public myPlans$ = this.planService.getAllMyPlans();

  public constructor(
    private readonly planService: PlanService,
    private readonly router: Router
  ) {}

  public editMyEvent(planId: string) {
    this.router.navigate(['/' + ROUTE_MANAGE_EVENT, planId]);
  }

  public deleteMyEvent(planId: string) {
    console.log('delete', planId);
  }
}
