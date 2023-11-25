import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
  NbTabsetModule,
} from '@nebular/theme';
import { BehaviorSubject, filter, map, switchMap, withLatestFrom } from 'rxjs';
import { ROUTE_PLAN_EVENT, ROUTE_VIEW_EVENT } from '../../constants';
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
    NbButtonModule,
    NbIconModule,
    NbDialogModule,
    NbTabsetModule,
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
    <nb-tabset fullWidth>
      <nb-tab tabTitle="My Events" class="tg-tab-no-px">
        <ng-container *ngIf="myPlans$ | async as myPlans; else noPrivatePlans">
          <ng-container *ngIf="myPlans.length > 0; else noPrivatePlans">
            <ng-container *ngFor="let plan of myPlans">
              <tg-event-card
                [overviewPlanDto]="plan"
                [isOwner]="true"
                (viewClicked)="viewEvent(plan.id)"
                (deleteClicked)="deleteMyEvent(plan.id)"
              >
              </tg-event-card>
            </ng-container>
          </ng-container>
        </ng-container>
        <ng-template #noPrivatePlans>
          <nb-card-body>
            <tg-void message="You have no private events"></tg-void>
          </nb-card-body>
        </ng-template>
      </nb-tab>
      <nb-tab tabTitle="Public Events" class="tg-tab-no-px">
        <ng-container
          *ngIf="publicPlans$ | async as publicPlans; else noPublicPlans"
        >
          <ng-container *ngIf="publicPlans.length > 0; else noPublicPlans">
            <ng-container *ngFor="let plan of publicPlans">
              <tg-event-card
                [overviewPlanDto]="plan"
                (viewClicked)="viewEvent(plan.id)"
              >
              </tg-event-card>
            </ng-container>
          </ng-container>
        </ng-container>
        <ng-template #noPublicPlans>
          <nb-card-body>
            <tg-void message="There are no public events"></tg-void>
          </nb-card-body>
        </ng-template>
      </nb-tab>
    </nb-tabset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  public readonly routePlanEvent = '/' + ROUTE_PLAN_EVENT;

  private readonly myPlansSubject: BehaviorSubject<OverviewPlanDto[]> =
    new BehaviorSubject([] as OverviewPlanDto[]);
  public readonly myPlans$ = this.myPlansSubject.asObservable();

  private readonly publicPlansSubject: BehaviorSubject<OverviewPlanDto[]> =
    new BehaviorSubject([] as OverviewPlanDto[]);
  public readonly publicPlans$ = this.publicPlansSubject.asObservable();

  public constructor(
    private readonly planService: PlanService,
    private readonly dialogService: NbDialogService,
    private readonly router: Router
  ) {}

  public viewEvent(planId: string) {
    console.log('view');

    this.router.navigate(['/' + ROUTE_VIEW_EVENT, planId]);
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

    this.planService
      .getAllPublicPlans()
      .pipe(
        withLatestFrom(this.myPlansSubject),
        map(([publicPlans, myPlans]) => {
          return publicPlans.filter(
            (publicPlan) =>
              !myPlans.some((myPlan) => myPlan.id === publicPlan.id)
          );
        })
      )
      .subscribe((plans) => {
        this.publicPlansSubject.next(plans);
      });
  }
}
