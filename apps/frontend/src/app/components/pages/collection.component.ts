import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { Observable, map } from 'rxjs';
import { Game, GameDto } from '../../models/game/game.dto';
import { GameService } from '../../services/game.service';
import { CollectionActionsComponent } from '../molecules/collection-actions.component';
import { ViewCollectionOwnComponent } from '../organisms/view-collection-own.component';

@Component({
  standalone: true,
  selector: 'tg-collection',
  imports: [
    CollectionActionsComponent,
    ViewCollectionOwnComponent,
    NbLayoutModule,
    AsyncPipe,
    NbSpinnerModule,
    NgIf,
    NgClass,
  ],
  template: `
    <ng-container>
      <tg-collection-actions
        (searchTerm)="handleSearchInput($event)"
      ></tg-collection-actions>
      <tg-view-collection-own
        [games]="filteredOptions$"
        (deleteFromCollection)="handleRemoveFromCollection($event)"
      ></tg-view-collection-own>
      <ng-container *ngIf="isLoading">
        <nb-spinner status="primary" size="large"></nb-spinner>
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent implements OnInit {
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

    this.games$.subscribe({
      complete: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  public handleSearchInput(searchTerm: string) {
    this.filteredOptions$ = this.games$.pipe(
      map((games) =>
        games.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  public handleRemoveFromCollection(game: GameDto) {
    this.gameService.deleteFromCollection(game.id).subscribe(() => {
      this.loadGames();
    });
  }
}
