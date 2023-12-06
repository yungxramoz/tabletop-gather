import { AsyncPipe, NgFor } from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { GameCardComponent } from '../molecules/game-card.component';
import {filter, Observable, switchMap} from "rxjs";
import {Game, GameDto} from "../../models/game/game.dto";
import {NbDialogService} from "@nebular/theme";
import {GameService} from "../../services/game.service";
import {DeleteDialogComponent, DeleteDialogResult} from "./delete-dialog.component";

@Component({
  standalone: true,
  selector: 'tg-view-collection-own',
  imports: [NgFor, AsyncPipe, GameCardComponent],
  template: `
    <ng-container *ngFor="let game of games | async">
      <tg-game-card
        [game]="game"
        [hasActionButton]="true"
        [actionButtonLabel]="'Remove from collection'"
        (actionButtonClicked)="handleRemoveFromCollection($event)"
      ></tg-game-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCollectionOwnComponent {
  @Input({ required: true }) public games!: Observable<Game[]>;
  @Output() public afterGameRemoved = new EventEmitter<void>();

  public constructor(
    private readonly dialogService: NbDialogService,
    private readonly gameService: GameService
  ) {}

  public handleRemoveFromCollection(game: GameDto) {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: 'Do you really want to remove this game from your collection?',
      })
      .onClose.pipe(
        filter((result: DeleteDialogResult) => result !== undefined),
        filter((result) => result.delete),
        switchMap(() => {
          return this.gameService.deleteFromCollection(game.id);
        })
      )
      .subscribe(() => {
        this.afterGameRemoved.emit();
      });
  }
}
