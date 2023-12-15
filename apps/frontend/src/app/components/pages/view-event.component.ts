import { AsyncPipe, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbTabComponent, NbTabsetModule } from '@nebular/theme';
import {
  Observable,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { MOCK_GAME_DTOS_LARGE } from '../../mocks/game.mock';
import { GamePlanDto } from '../../models/game/game-plan.dto';
import { OverviewGatheringDto } from '../../models/gathering/overview-gathering.dto';
import { UpsertGatheringDto } from '../../models/gathering/upsert-gathering.dto';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';
import { UserPlanDto } from '../../models/user/user-plan.dto';
import { GatheringService } from '../../services/gathering.service';
import { PlanService } from '../../services/plan.service';
import { UsersService } from '../../services/user.service';
import { updateNumberBadge } from '../../utils/nebular.utility';
import { VoidComponent } from '../atoms/void.component';
import { ViewEventGamesComponent } from '../organisms/view-event-games.component';
import { ViewEventGeneralComponent } from '../organisms/view-event-general.component';
import { ViewEventPlayersComponent } from '../organisms/view-event-players.component';

@Component({
  standalone: true,
  selector: 'tg-view-event',
  imports: [
    NgIf,
    NbTabsetModule,
    AsyncPipe,
    ViewEventGeneralComponent,
    ViewEventGamesComponent,
    ViewEventPlayersComponent,
    VoidComponent,
  ],
  template: `
    <ng-container *ngIf="detailPlan$ | async as detailPlan; else noPlan">
      <nb-tabset fullWidth>
        <nb-tab tabTitle="Event" class="tg-tab-no-px">
          <tg-view-event-general
            [isOwner]="isOwner$ | async"
            [detailPlan]="detailPlan"
            [myGatheringsForThisPlan]="myGatheringsForThisPlan$ | async"
            (gatheringUpserted)="onGatheringUpserted($event)"
          ></tg-view-event-general>
        </nb-tab>

        <nb-tab tabTitle="Players" class="tg-tab-no-px">
          <tg-view-event-players
            [detailPlan]="detailPlan"
            [attendees]="attendees$ | async"
          ></tg-view-event-players>
        </nb-tab>

        <nb-tab tabTitle="Games" class="tg-tab-no-px">
          <tg-view-event-games
            [detailPlan]="detailPlan"
            [availableGames]="availableGames$ | async"
          ></tg-view-event-games>
        </nb-tab>
      </nb-tabset>
    </ng-container>

    <ng-template #noPlan>
      <tg-void message="No plan found."></tg-void>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventComponent implements OnInit, AfterViewInit {
  @ViewChildren(NbTabComponent)
  private readonly tabs!: QueryList<NbTabComponent>;

  public detailPlan$!: Observable<DetailPlanDto>;
  public attendees$!: Observable<UserPlanDto[]>;
  public availableGames$!: Observable<GamePlanDto[]>;
  public isOwner$!: Observable<boolean>;
  public myGatheringsForThisPlan$!: Observable<OverviewGatheringDto[] | null>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly planService: PlanService,
    private readonly userService: UsersService,
    private readonly gatheringService: GatheringService
  ) {}

  public onGatheringUpserted(upsertGatheringDtos: UpsertGatheringDto[]) {
    this.gatheringService.attendGathering(upsertGatheringDtos).subscribe();
  }

  public ngOnInit() {
    this.detailPlan$ = this.route.params.pipe(
      map((params) => params['eventId']),
      switchMap((eventId) => this.planService.getPlanById(eventId)),
      shareReplay(1)
    );
  }

  public ngAfterViewInit() {
    this.isOwner$ = this.detailPlan$.pipe(
      switchMap((plan) =>
        // TODO: Maybe have userService.me() cached? Should probably use a BehaviorSubject
        // in the user service and:
        // - call /users/me if it's currently null
        // - next it if the user gets updated
        // - next it to null if the user logs out or gets deleted
        // Then replace calls to userService.me() with userService.me$
        this.userService.me().pipe(map((me) => me.email === plan.owner.email))
      )
    );

    this.attendees$ = this.detailPlan$.pipe(
      switchMap((plan) => this.userService.getUsersByPlanId(plan.id)),
      tap((users) =>
        updateNumberBadge(this.tabs.get(1) ?? undefined, users.length)
      )
    );

    this.availableGames$ = of(
      // TODO: Get from api
      MOCK_GAME_DTOS_LARGE.map((game) => ({
        ...game,
        owners: ['John Doe', 'Jane Doe'],
      }))
    );

    this.myGatheringsForThisPlan$ = this.planService
      .getAllAttendingPlans()
      .pipe(
        withLatestFrom(this.detailPlan$),
        map(([myAttendingPlans, detailPlan]) => {
          const attendingPlan = myAttendingPlans.find(
            (plan) => plan.id === detailPlan.id
          );

          // Pluck the matching DetailGatheringDtos from the detail plan
          if (attendingPlan) {
            const myGatherings = attendingPlan.gatheringDtos.filter(
              (attendingGathering) =>
                detailPlan.gatherings.some(
                  (gathering) => attendingGathering.id === gathering.id
                )
            );

            return myGatherings;
          }
          return null;
        })
      );
  }
}
