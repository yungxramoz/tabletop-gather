import {ChangeDetectionStrategy, Component, HostListener, ChangeDetectorRef} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {InputComponent} from "../atoms/input.component";
import {GameCardComponent} from "../molecules/game-card.component";
import {concatMap, finalize, Observable, of} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Game, GameDto} from "../../models/game/game.dto";
import {GameService} from "../../services/game.service";

@Component({
  standalone: true,
  selector: 'tg-add-to-collection',
  imports: [
    FormsModule,
    InputComponent,
    GameCardComponent,
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  template: `
    <ng-container>
      <tg-input
        class="tg-full-width"
        ngModel
        id="search"
        name="search"
        icon="search"
        placeholder="Search"
        [isSearch]="true"
        (searchInput)="handleSearchInput($event)"
      ></tg-input>
      <ng-container *ngFor="let game of (filteredOptions$ | async) || []">
        <tg-game-card [game]="game" [hasAddToCollectionButton]="true" (addToCollection)="handleAddToCollection($event)"></tg-game-card>
      </ng-container>
      <div *ngIf="isLoading">Loading...</div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCollectionComponent {
  public searchInput = '';
  public filteredOptions$!: Observable<Game[]>;

  protected isLoading = false;

  private games: GameDto[] = [];
  private currentPage = 0;

  public constructor(
    private readonly gameService: GameService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loadGames();
  }

  private loadGames(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    this.gameService.getAllGames(this.searchInput, this.currentPage + 1)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
        concatMap((newGames) => {
          this.games.push(...newGames);
          this.currentPage++;
          return of(this.games);
        })
      )
      .subscribe((games) => {
        this.filteredOptions$ = of(this.games);
      });
  }

  public handleSearchInput(searchInput: string) {
    this.searchInput = searchInput;
    this.games = [];
    this.currentPage = 0;
    this.loadGames();
  }

  public handleAddToCollection(game: GameDto) {
    console.log(game.id);
    this.gameService.addGameToCollection(game.id).subscribe()
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll(event: any): void {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body, html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 1) {
      this.loadGames();
    }
  }
}
