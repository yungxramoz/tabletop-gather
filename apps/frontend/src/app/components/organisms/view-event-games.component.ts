import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbAccordionModule, NbAlertModule } from '@nebular/theme';
import { GamePlan } from '../../models/game/game-plan.dto';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';
import { GatheringDateComponent } from '../atoms/gathering-date.component';
import { VoidComponent } from '../atoms/void.component';
import { GameCardComponent } from '../molecules/game-card.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-games',
  imports: [
    NgFor,
    NgIf,
    GameCardComponent,
    NbAlertModule,
    NbAccordionModule,
    VoidComponent,
    GatheringDateComponent,
  ],
  template: `
    <nb-alert outline="primary" *ngIf="detailPlan && detailPlan.game !== null">
      A game has been selected for this event.
    </nb-alert>

    <ng-container *ngIf="availableGames as gamePlans; else noGames">
      <ng-container *ngFor="let gamePlan of gamePlans">
        <nb-accordion *ngIf="gamePlan">
          <nb-accordion-item [expanded]="true">
            <nb-accordion-item-header>
              <p>
                Common games on
                <b>
                  <tg-gathering-date
                    [date]="gamePlan.gatheringDto"
                  ></tg-gathering-date>
                </b>
              </p>
            </nb-accordion-item-header>

            <nb-accordion-item-body>
              <ng-container
                *ngIf="gamePlan.games?.length; else noGamesForThisGathering"
              >
                <tg-game-card
                  *ngFor="let game of gamePlan.games"
                  [game]="game"
                ></tg-game-card>
              </ng-container>

              <ng-template #noGamesForThisGathering>
                <tg-void
                  message="There are no common games for this gathering"
                ></tg-void>
              </ng-template>
            </nb-accordion-item-body>
          </nb-accordion-item>
        </nb-accordion>
      </ng-container>
    </ng-container>

    <ng-template #noGames>
      <tg-void message="There are no common games for any gathering"></tg-void>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventGamesComponent {
  // TODO: Delete detailPlan input if not needed
  @Input({ required: true }) public detailPlan!: DetailPlanDto | null;
  @Input({ required: true }) public availableGames!: GamePlan[] | null;
}
