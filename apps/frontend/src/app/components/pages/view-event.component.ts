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
import {
  NbDialogService,
  NbTabComponent,
  NbTabsetModule,
} from '@nebular/theme';
import {
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CommentItemDto } from '../../models/comment/comment-item.dto';
import { CreateComment } from '../../models/comment/create-comment.dto';
import { UpdateCommentDto } from '../../models/comment/update-comment.dto';
import { GamePlanDto } from '../../models/game/game-plan.dto';
import { OverviewGatheringDto } from '../../models/gathering/overview-gathering.dto';
import { UpsertGatheringDto } from '../../models/gathering/upsert-gathering.dto';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';
import { UserPlanDto } from '../../models/user/user-plan.dto';
import { UserDto } from '../../models/user/user.dto';
import { SortCommentsPipe } from '../../pipes/sort-comment.pipe';
import { CommentService } from '../../services/comment.service';
import { GameService } from '../../services/game.service';
import { GatheringService } from '../../services/gathering.service';
import { PlanService } from '../../services/plan.service';
import { UsersService } from '../../services/user.service';
import { updateTabBadge } from '../../utils/nebular.utility';
import { VoidComponent } from '../atoms/void.component';
import {
  DeleteDialogComponent,
  DeleteDialogResult,
} from '../organisms/delete-dialog.component';
import { ViewEventCommentsComponent } from '../organisms/view-event-comments.component';
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
    ViewEventCommentsComponent,
    VoidComponent,
    SortCommentsPipe,
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

        <nb-tab tabIcon="message-circle-outline" class="tg-tab-no-px">
          <tg-view-event-comments
            [detailPlan]="detailPlan"
            [user]="me$ | async"
            [comments]="comments$ | async | sortComments"
            (commentCreate)="onCommentCreate($event)"
            (commentUpdate)="onCommentUpdate($event)"
            (commentDelete)="onCommentDelete($event)"
          ></tg-view-event-comments>
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

  public readonly availableGamesSubject: Subject<GamePlanDto[]> = new Subject<
    GamePlanDto[]
  >();
  public readonly attendeesSubject: Subject<UserPlanDto[]> = new Subject<
    UserPlanDto[]
  >();
  public readonly commentsSubject: Subject<CommentItemDto[]> = new Subject<
    CommentItemDto[]
  >();

  public detailPlan$!: Observable<DetailPlanDto>;
  public readonly attendees$: Observable<UserPlanDto[]> =
    this.attendeesSubject.asObservable();
  public readonly availableGames$: Observable<GamePlanDto[]> =
    this.availableGamesSubject.asObservable();
  public readonly comments$: Observable<CommentItemDto[]> =
    this.commentsSubject.asObservable();
  public me$!: Observable<UserDto>;
  public isOwner$!: Observable<boolean>;
  public myGatheringsForThisPlan$!: Observable<OverviewGatheringDto[] | null>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly planService: PlanService,
    private readonly usersService: UsersService,
    private readonly gatheringService: GatheringService,
    private readonly gameService: GameService,
    private readonly commentService: CommentService,
    private readonly dialogService: NbDialogService
  ) {}

  public onGatheringUpserted(upsertGatheringDtos: UpsertGatheringDto[]) {
    // TODO: Retrigger this.planService.getAllAttendingPlans()
    this.gatheringService.attendGathering(upsertGatheringDtos).subscribe();
  }

  public onCommentCreate(event: CreateComment) {
    this.commentService
      .createComment(event)
      .subscribe(() => this.updateComments());
  }
  public onCommentUpdate(event: UpdateCommentDto) {
    // No need to update the comment in the backend here, bc we also modify the state
    this.commentService.updateComment(event).subscribe();
  }

  public onCommentDelete(event: CommentItemDto) {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: { message: 'Do you really want to delete this commment?' },
      })
      .onClose.pipe(
        filter((result: DeleteDialogResult) => result !== undefined),
        filter((result) => result.delete),
        switchMap(() => this.commentService.deleteComment(event.id))
      )
      .subscribe(() => this.updateComments());
  }

  public ngOnInit() {
    this.me$ = this.usersService
      .me()
      .pipe(shareReplay(1)) as Observable<UserDto>;

    this.detailPlan$ = this.route.params.pipe(
      map((params) => params['eventId']),
      switchMap((eventId) => this.planService.getPlanById(eventId)),
      shareReplay(1)
    );
  }

  public ngAfterViewInit() {
    this.isOwner$ = combineLatest([this.detailPlan$, this.me$]).pipe(
      map(([plan, me]) => me.email === plan.owner.email)
    );

    this.updateAvailableGames();
    this.updateAttendees();
    this.updateComments();

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

  private updateAvailableGames() {
    this.detailPlan$
      .pipe(
        take(1),
        switchMap((plan) => this.gameService.getGamesByPlanId(plan.id)),
        tap((gamePlans) => {
          this.availableGamesSubject.next(gamePlans);
          const badgeValue =
            gamePlans &&
            gamePlans.length &&
            gamePlans.some((game) => game.games.length)
              ? '!'
              : 0;

          updateTabBadge(this.tabs.get(2) ?? undefined, badgeValue);
        })
      )
      .subscribe();
  }

  private updateAttendees() {
    this.detailPlan$
      .pipe(
        take(1),
        switchMap((plan) => this.usersService.getUsersByPlanId(plan.id)),
        tap((users) => {
          this.attendeesSubject.next(users);
          updateTabBadge(this.tabs.get(1) ?? undefined, users.length);
        })
      )
      .subscribe();
  }

  private updateComments() {
    this.detailPlan$
      .pipe(
        take(1),
        switchMap((plan) => this.commentService.getCommentsByPlanId(plan.id)),
        tap((comments) => {
          this.commentsSubject.next(comments);
          updateTabBadge(this.tabs.last ?? undefined, comments.length);
        })
      )
      .subscribe();
  }
}
