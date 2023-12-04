import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CollectionActionsComponent} from "../molecules/collection-actions.component";
import {ViewCollectionOwnComponent} from "../organisms/view-collection-own.component";
import {map, Observable, of} from "rxjs";
import {GameService} from "../../services/game.service";
import {Game} from "../../models/game/game.dto";

@Component({
  standalone: true,
  selector: 'tg-collection',
  imports: [CollectionActionsComponent, ViewCollectionOwnComponent],
  template: `
    <ng-container>
      <tg-collection-actions (searchInput)="handleSearchInput($event)"></tg-collection-actions>
      <tg-view-collection-own [games]="filteredOptions$"></tg-view-collection-own>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  public searchInput = '';
  public filteredOptions$!: Observable<Game[]>;
  public readonly games$: Observable<Game[]> = this.gameService.getAllMyGames();

  public constructor(private readonly gameService: GameService) {
    this.filteredOptions$ = this.games$;
  }

  public handleSearchInput(searchInput: string) {
    this.filteredOptions$ = this.games$.pipe(
      map((games) =>
        games.filter((game) =>
          game.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    )
  }

  // TODO: Get from API
  /*public games$: Observable<GamePlan[]> = of(
    MOCK_GAME_OWN_COLLECTION.map((game) => ({
      ...game,
      owners: ['John Doe', 'Jane Doe'],
    }))
  );*/
}
