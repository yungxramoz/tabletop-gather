import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbAlertModule } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { MOCK_GAME_DTOS_LARGE } from '../../mocks/game.mock';
import { GamePlan } from '../../models/game/game-plan.dto';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';
import { GameCardComponent } from '../molecules/game-card.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-games',
  imports: [NgFor, NgIf, AsyncPipe, GameCardComponent, NbAlertModule],
  template: `
    <nb-alert outline="primary" *ngIf="detailPlan && detailPlan.game !== null">
      A game has been selected for this event.
    </nb-alert>
    <ng-container *ngFor="let game of games$ | async">
      <tg-game-card [game]="game"></tg-game-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventGamesComponent {
  @Input({ required: true }) public detailPlan!: DetailPlanDto | null;

  // TODO: Get from API
  public games$: Observable<GamePlan[]> = of(
    MOCK_GAME_DTOS_LARGE.map((game) => ({
      ...game,
      owners: ['John Doe', 'Jane Doe'],
    }))
  );
}
