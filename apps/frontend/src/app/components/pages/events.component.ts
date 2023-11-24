import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
  NbListModule,
} from '@nebular/theme';
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { ROUTE_MANAGE_EVENT, ROUTE_PLAN_EVENT } from '../../constants';
import { OverviewPlanDto } from '../../models/overview-plan.dto';
import { PlanService } from '../../services/plan.service';
import { VoidComponent } from '../atoms/void.component';
import { EventCardComponent } from '../molecules/event-card.component';
import {
  DeleteDialogComponent,
  DeleteDialogResult,
} from '../organisms/delete-dialog.component';

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
    NbDialogModule,
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
export class EventsComponent implements OnInit {
  public readonly routePlanEvent = '/' + ROUTE_PLAN_EVENT;

  private readonly myPlansSubject: BehaviorSubject<OverviewPlanDto[]> =
    new BehaviorSubject([] as OverviewPlanDto[]);
  public readonly myPlans$ = this.myPlansSubject.asObservable();

  public constructor(
    private readonly planService: PlanService,
    private readonly dialogService: NbDialogService,
    private readonly router: Router
  ) {}

  public editMyEvent(planId: string) {
    this.router.navigate(['/' + ROUTE_MANAGE_EVENT, planId]);
  }

  public deleteMyEvent(planId: string) {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: 'Do you really want to delete this event?',
      })
      .onClose.pipe(
        filter((result: DeleteDialogResult) => result !== undefined),
        filter((result) => result.delete),
        switchMap(() => {
          return this.planService.deletePlan(planId);
        })
      )
      .subscribe(() => {
        this.updateMyPlans();
      });
  }

  public ngOnInit(): void {
    this.updateMyPlans();
  }

  private updateMyPlans() {
    this.planService.getAllMyPlans().subscribe((plans) => {
      this.myPlansSubject.next(plans);
    });
  }
}
