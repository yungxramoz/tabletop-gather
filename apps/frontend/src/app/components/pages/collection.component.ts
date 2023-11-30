import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CollectionActionsComponent} from "../molecules/collection-actions.component";
import {ViewCollectionOwnComponent} from "../organisms/view-collection-own.component";
import {map, Observable, of} from "rxjs";
import {GamePlan} from "../../models/game/game-plan.dto";
import {MOCK_GAME_OWN_COLLECTION} from "../../mocks/game.mock";

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
  public filteredOptions$!: Observable<GamePlan[]>;

  private constructor() {
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
  public games$: Observable<GamePlan[]> = of(
    MOCK_GAME_OWN_COLLECTION.map((game) => ({
      ...game,
      owners: ['John Doe', 'Jane Doe'],
    }))
  );
}
