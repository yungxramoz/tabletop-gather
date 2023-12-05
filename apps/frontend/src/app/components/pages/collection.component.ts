import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CollectionActionsComponent} from "../molecules/collection-actions.component";
import {ViewCollectionOwnComponent} from "../organisms/view-collection-own.component";
import {map, Observable} from "rxjs";
import {GameService} from "../../services/game.service";
import {Game} from "../../models/game/game.dto";
import {NbLayoutModule} from "@nebular/theme";

@Component({
  standalone: true,
  selector: 'tg-collection',
  imports: [CollectionActionsComponent, ViewCollectionOwnComponent, NbLayoutModule],
  template: `
    <ng-container>
      <tg-collection-actions (searchInput)="handleSearchInput($event)"></tg-collection-actions>
      <tg-view-collection-own [games]="filteredOptions$" (afterGameRemoved)="handleAfterGameRemoved()"></tg-view-collection-own>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  public filteredOptions$!: Observable<Game[]>;
  public games$!: Observable<Game[]>;

  protected isLoading = false;

  public constructor(private readonly gameService: GameService) {
    this.loadGames();
  }

  private loadGames() {
    if (this.isLoading) return;

    this.isLoading = true;

    this.games$ = this.gameService.getAllMyGames();
    this.filteredOptions$ = this.games$;

    this.isLoading = false;
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

  public handleAfterGameRemoved() {
    this.loadGames();
  }
}
