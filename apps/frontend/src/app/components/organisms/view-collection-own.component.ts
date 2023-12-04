import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameCardComponent } from '../molecules/game-card.component';
import {Observable} from "rxjs";
import {Game} from "../../models/game/game.dto";

@Component({
  standalone: true,
  selector: 'tg-view-collection-own',
  imports: [NgFor, AsyncPipe, GameCardComponent],
  template: `
    <ng-container *ngFor="let game of games | async">
      <tg-game-card [game]="game"></tg-game-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCollectionOwnComponent {
  @Input({ required: true }) public games!: Observable<Game[]>;
}
