import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import {MOCK_GAME_OWN_COLLECTION} from '../../mocks/game.mock';
import { GamePlan } from '../../models/game/game-plan.dto';
import { GameCardComponent } from '../molecules/game-card.component';

@Component({
  standalone: true,
  selector: 'tg-view-collection-own',
  imports: [NgFor, AsyncPipe, GameCardComponent],
  template: `
    <ng-container *ngFor="let game of games$ | async">
      <tg-game-card [game]="game"></tg-game-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCollectionOwnComponent {

  // TODO: Get from API
  public games$: Observable<GamePlan[]> = of(
    MOCK_GAME_OWN_COLLECTION.map((game) => ({
      ...game,
      owners: ['John Doe', 'Jane Doe'],
    }))
  );
}
