import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbTabsetModule } from '@nebular/theme';
import { Observable, map, switchMap, tap } from 'rxjs';
import { DetailPlanDto } from '../../models/detail-plan.dto';
import { PlanService } from '../../services/plan.service';
import { ManageEventGamesComponent } from '../organisms/manage-event-games.component';
import { ManageEventGeneralComponent } from '../organisms/manage-event-general.component';
import { ManageEventPlayersComponent } from '../organisms/manage-event-players.component';

@Component({
  standalone: true,
  selector: 'tg-manage-event',
  imports: [
    NbTabsetModule,
    AsyncPipe,
    ManageEventGeneralComponent,
    ManageEventGamesComponent,
    ManageEventPlayersComponent,
  ],
  template: `
    <nb-tabset fullWidth class="tg-full">
      <nb-tab tabTitle="Event">
        <tg-manage-event-general
          [detailPlan]="detailPlan$ | async"
        ></tg-manage-event-general>
      </nb-tab>
      <nb-tab tabTitle="Players">
        <tg-manage-event-players
          [detailPlan]="detailPlan$ | async"
        ></tg-manage-event-players>
      </nb-tab>
      <nb-tab tabTitle="Games">
        <tg-manage-event-games
          [detailPlan]="detailPlan$ | async"
        ></tg-manage-event-games>
      </nb-tab>
    </nb-tabset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageEventComponent implements OnInit {
  public detailPlan$!: Observable<DetailPlanDto>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly planService: PlanService
  ) {}

  public ngOnInit() {
    this.detailPlan$ = this.route.params
      .pipe(tap((params) => console.log(params)))
      .pipe(
        map((params) => params['eventId']),
        switchMap((eventId) => this.planService.getPlanById(eventId))
      );

    this.detailPlan$.subscribe();
  }
}
