import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
  NbTabComponent,
  NbTabsetModule,
} from '@nebular/theme';
import { BehaviorSubject, filter, map, switchMap, withLatestFrom } from 'rxjs';
import { ROUTE_PLAN_EVENT, ROUTE_VIEW_EVENT } from '../../constants';
import { OverviewPlanDto } from '../../models/overview-plan.dto';
import { PlanService } from '../../services/plan.service';
import { VoidComponent } from '../atoms/void.component';
import {
  DeleteDialogComponent,
  DeleteDialogResult,
} from '../organisms/delete-dialog.component';
import { EventCardComponent } from '../organisms/event-card.component';

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
      <nb-tab tabTitle="My Events" class="tg-tab-no-px" badgeText="12">
        <ng-container *ngIf="myPlans$ | async as myPlans; else noPrivatePlans">
          <ng-container *ngIf="myPlans.length > 0; else noPrivatePlans">
            <ng-container *ngFor="let plan of myPlans">
              <tg-event-card
                [overviewPlanDto]="plan"
                [isOwner]="true"
                (cardClicked)="viewEvent(plan.id)"
                (editClicked)="editMyEvent(plan.id)"
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
          <div class="tg-flex-row tg-justify-around tg-p-1">
            <i class="caption">(Your public events are not shown here)</i>
          </div>

          <ng-container *ngIf="publicPlans.length > 0; else noPublicPlans">
            <ng-container *ngFor="let plan of publicPlans">
              <tg-event-card
                [overviewPlanDto]="plan"
                (cardClicked)="viewEvent(plan.id)"
              >
              </tg-event-card>
            </ng-container>
          </ng-container>
        </ng-container>

        <ng-template #noPublicPlans>
          <nb-card-body> </nb-card-body>
        </ng-template>
      </nb-tab>
    </nb-tabset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements AfterViewInit {
  @ViewChildren(NbTabComponent)
  private readonly tabs!: QueryList<NbTabComponent>;

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
    this.router.navigate(['/' + ROUTE_VIEW_EVENT, planId]);
  }

  public editMyEvent(planId: string) {
    // TODO: Implement "edit event" feature
    alert("That's not implemented yet");
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
        this.getPlans();
      });
  }

  public ngAfterViewInit(): void {
    this.getPlans();
  }

  // TODO (decide): Does the backend filter out public plans that are mine?
  // TODO (decide): Does the backend filter out public plans that have already happened?
  // TODO (decide): How do we handle events that have been joined? Currently, there's no overview of them
  private getPlans() {
    // Get my plans
    const subscriptionPrivate = this.planService
      .getAllMyPlans()
      .subscribe((plans) => {
        this.myPlansSubject.next(plans);

        // Update badge
        this.tabs.first.badgeText = `${
          plans.length > 100 ? '99+' : plans.length
        }`;
        this.tabs.first.badgeStatus = 'primary';

        subscriptionPrivate.unsubscribe();
      });

    // Get public plans
    const subscriptionPublic = this.planService
      .getAllPublicPlans()
      .pipe(
        withLatestFrom(this.myPlansSubject),
        map(([publicPlans, myPlans]) => {
          // Only show public plans that are not mine
          return publicPlans.filter(
            (publicPlan) =>
              !myPlans.some((myPlan) => myPlan.id === publicPlan.id)
          );
        })
      )
      .subscribe((plans) => {
        this.publicPlansSubject.next(plans);

        // Update badge
        this.tabs.last.badgeText = `${
          plans.length > 100 ? '99+' : plans.length
        }`;
        this.tabs.last.badgeStatus = 'primary';

        subscriptionPublic.unsubscribe();
      });
  }
}
