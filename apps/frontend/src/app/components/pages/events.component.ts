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
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { ROUTE_PLAN_EVENT, ROUTE_VIEW_EVENT } from '../../constants';
import { OverviewPlanDto } from '../../models/plan/overview-plan.dto';
import { PlanService } from '../../services/plan.service';
import { updateTabBadge } from '../../utils/nebular.utility';
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
    <button
      nbButton
      outline
      class="tg-full-width tg-mb-4"
      status="primary"
      shape="semi-round"
      [routerLink]="[routePlanEvent]"
    >
      <nb-icon icon="plus-outline"></nb-icon>
      Create Event
    </button>

    <nb-tabset fullWidth>
      <nb-tab tabTitle="Mine" class="tg-tab-no-px">
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

      <nb-tab tabTitle="Public" class="tg-tab-no-px">
        <ng-container
          *ngIf="publicPlans$ | async as publicPlans; else noPublicPlans"
        >
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
          <nb-card-body>
            <tg-void message="There are no public events"></tg-void>
          </nb-card-body>
        </ng-template>
      </nb-tab>

      <nb-tab tabTitle="Attending" class="tg-tab-no-px">
        <ng-container
          *ngIf="
            attendingPlans$ | async as attendingPlans;
            else attendingNoEvents
          "
        >
          <ng-container
            *ngIf="attendingPlans.length > 0; else attendingNoEvents"
          >
            <ng-container *ngFor="let plan of attendingPlans">
              <tg-event-card
                [overviewPlanDto]="plan"
                (cardClicked)="viewEvent(plan.id)"
              >
              </tg-event-card>
            </ng-container>
          </ng-container>
        </ng-container>

        <ng-template #attendingNoEvents>
          <nb-card-body>
            <tg-void message="You are not attending any event"></tg-void>
          </nb-card-body>
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

  private readonly attendingPlansSubject: BehaviorSubject<OverviewPlanDto[]> =
    new BehaviorSubject([] as OverviewPlanDto[]);
  public readonly attendingPlans$ = this.attendingPlansSubject.asObservable();

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

  private getPlans() {
    // Get my plans
    const subscriptionPrivate = this.planService
      .getAllMyPlans()
      .subscribe((plans) => {
        this.myPlansSubject.next(plans);

        // Update badge
        updateTabBadge(this.tabs.first, plans.length);

        subscriptionPrivate.unsubscribe();
      });

    // Get public plans
    const subscriptionPublic = this.planService
      .getAllPublicPlans()
      .subscribe((plans) => {
        this.publicPlansSubject.next(plans);

        // Update badge
        updateTabBadge(this.tabs.get(1)!, plans.length);

        subscriptionPublic.unsubscribe();
      });

    // Get attending plans
    const subscriptionAttending = this.planService
      .getAllAttendingPlans()
      .subscribe((plans) => {
        this.attendingPlansSubject.next(plans);

        // Update badge
        updateTabBadge(this.tabs.last, plans.length);

        subscriptionAttending.unsubscribe();
      });
  }
}
