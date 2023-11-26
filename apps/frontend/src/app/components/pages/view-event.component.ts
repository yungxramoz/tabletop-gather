import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbTabsetModule } from '@nebular/theme';
import { Observable, map, switchMap } from 'rxjs';
import { DetailPlanDto } from '../../models/detail-plan.dto';
import { PlanService } from '../../services/plan.service';
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
    <nb-tabset fullWidth *ngIf="detailPlan$ | async as detailPlan; else noPlan">
      <nb-tab tabTitle="Event" class="tg-tab-no-px">
        <tg-view-event-general
          [detailPlan]="detailPlan"
        ></tg-view-event-general>
      </nb-tab>
      <nb-tab tabTitle="Players" class="tg-tab-no-px">
        <tg-view-event-players
          [detailPlan]="detailPlan"
        ></tg-view-event-players>
      </nb-tab>
      <nb-tab tabTitle="Games" class="tg-tab-no-px">
        <tg-view-event-games [detailPlan]="detailPlan"></tg-view-event-games>
      </nb-tab>
    </nb-tabset>
    <ng-template #noPlan>
      <tg-void message="No plan found."></tg-void>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventComponent implements OnInit {
  public detailPlan$!: Observable<DetailPlanDto>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly planService: PlanService
  ) {}

  public ngOnInit() {
    this.detailPlan$ = this.route.params.pipe(
      map((params) => params['eventId']),
      switchMap((eventId) => this.planService.getPlanById(eventId))
    );

    this.detailPlan$.subscribe();
  }
}
