import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable, filter } from 'rxjs';
import { Game, GameDto } from '../../models/game/game.dto';
import { GameCardComponent } from '../molecules/game-card.component';
import {
  DeleteDialogComponent,
  DeleteDialogResult,
} from './delete-dialog.component';

@Component({
  standalone: true,
  selector: 'tg-view-collection-own',
  imports: [NgFor, AsyncPipe, GameCardComponent],
  template: `
    <ng-container *ngFor="let game of games | async">
      <tg-game-card
        [game]="game"
        [actionButton]="{ icon: 'trash-2-outline', status: 'danger' }"
        (actionButtonClicked)="handleRemoveFromCollection($event)"
      ></tg-game-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCollectionOwnComponent {
  @Input({ required: true }) public games!: Observable<Game[]>;
  @Output() public deleteFromCollection = new EventEmitter<GameDto>();

  public constructor(private readonly dialogService: NbDialogService) {}

  public handleRemoveFromCollection(game: GameDto) {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: {
          message:
            'Do you really want to remove this game from your collection?',
        },
      })
      .onClose.pipe(
        filter((result: DeleteDialogResult) => result !== undefined),
        filter((result) => result.delete)
      )
      .subscribe(() => {
        this.deleteFromCollection.emit(game);
      });
  }
}
