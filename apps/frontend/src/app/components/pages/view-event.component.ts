import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbTabsetModule } from '@nebular/theme';
import { Observable, map, switchMap, tap } from 'rxjs';
import { DetailPlanDto } from '../../models/detail-plan.dto';
import { PlanService } from '../../services/plan.service';
import { ViewEventGamesComponent } from '../organisms/view-event-games.component';
import { ViewEventGeneralComponent } from '../organisms/view-event-general.component';
import { ViewEventPlayersComponent } from '../organisms/view-event-players.component';

@Component({
  standalone: true,
  selector: 'tg-view-event',
  imports: [
    NbTabsetModule,
    AsyncPipe,
    ViewEventGeneralComponent,
    ViewEventGamesComponent,
    ViewEventPlayersComponent,
  ],
  template: `
    <nb-tabset fullWidth class="tg-full">
      <nb-tab tabTitle="Event">
        <tg-view-event-general
          [detailPlan]="detailPlan$ | async"
        ></tg-view-event-general>
      </nb-tab>
      <nb-tab tabTitle="Players">
        <tg-view-event-players
          [detailPlan]="detailPlan$ | async"
        ></tg-view-event-players>
      </nb-tab>
      <nb-tab tabTitle="Games">
        <tg-view-event-games
          [detailPlan]="detailPlan$ | async"
        ></tg-view-event-games>
      </nb-tab>
    </nb-tabset>
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
    this.detailPlan$ = this.route.params
      .pipe(tap((params) => console.log(params)))
      .pipe(
        map((params) => params['eventId']),
        switchMap((eventId) => this.planService.getPlanById(eventId))
      );

    this.detailPlan$.subscribe();
  }
}
