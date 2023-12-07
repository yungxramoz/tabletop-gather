import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CollectionActionsComponent} from "../molecules/collection-actions.component";
import {ViewCollectionOwnComponent} from "../organisms/view-collection-own.component";
import {map, Observable} from "rxjs";
import {GameService} from "../../services/game.service";
import {Game, GameDto} from "../../models/game/game.dto";
import {NbLayoutModule} from "@nebular/theme";

@Component({
  standalone: true,
  selector: 'tg-collection',
  imports: [CollectionActionsComponent, ViewCollectionOwnComponent, NbLayoutModule],
  template: `
    <ng-container>
      <tg-collection-actions (searchTerm)="handleSearchInput($event)"></tg-collection-actions>
      <tg-view-collection-own [games]="filteredOptions$" (deleteFromCollection)="handleRemoveFromCollection($event)"></tg-view-collection-own>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  public filteredOptions$!: Observable<Game[]>;
  public games$!: Observable<Game[]>;

  protected isLoading = false;

  public constructor(
    private readonly gameService: GameService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadGames();
  }

  private loadGames() {
    if (this.isLoading) return;

    this.isLoading = true;

    this.games$ = this.gameService.getAllMyGames();
    this.filteredOptions$ = this.games$;

    this.cdr.detectChanges();

    this.isLoading = false;
  }

  public handleSearchInput(searchTerm: string) {
    this.filteredOptions$ = this.games$.pipe(
      map((games) =>
        games.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    )
  }

  public handleRemoveFromCollection(game: GameDto) {
    this.gameService.deleteFromCollection(game.id).subscribe(() => {
      this.loadGames();
    });
  }
}
