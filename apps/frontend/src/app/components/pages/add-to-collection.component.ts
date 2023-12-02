import {ChangeDetectionStrategy, Component} from "@angular/core";
import {GamePlan} from "../../models/game/game-plan.dto";
import {MOCK_GAME_DTOS_LARGE} from "../../mocks/game.mock";
import {map} from "rxjs/operators";
import {FormsModule} from "@angular/forms";
import {InputComponent} from "../atoms/input.component";
import {GameCardComponent} from "../molecules/game-card.component";
import {Observable, of} from "rxjs";
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'tg-add-to-collection',
  imports: [
    FormsModule,
    InputComponent,
    GameCardComponent,
    AsyncPipe,
    NgForOf
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
      <ng-container *ngFor="let game of filteredOptions$ | async">
        <tg-game-card [game]="game"></tg-game-card>
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCollectionComponent {
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
    MOCK_GAME_DTOS_LARGE.map((game) => ({
      ...game,
      owners: ['John Doe', 'Jane Doe'],
    }))
  );
}
