import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_GAME_DTOS_LARGE } from '../../mocks/game.mock';
import { DetailPlanDto } from '../../models/detail-plan.dto';
import { GameDto } from '../../models/game.dto';
import { GameCardComponent } from '../molecules/game-card.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-games',
  imports: [NgFor, AsyncPipe, GameCardComponent],
  template: `
    <ng-container *ngFor="let game of games$ | async">
      <tg-game-card [game]="game" [owners]="owners$ | async"></tg-game-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventGamesComponent {
  @Input({ required: true }) public detailPlan!: DetailPlanDto | null;

  // TODO: Get from API
  public games$: Observable<GameDto[]> = of(MOCK_GAME_DTOS_LARGE);

  // TODO: Get from API
  public owners$: Observable<string[]> = of(['John Doe', 'Jane Doe']);
}
