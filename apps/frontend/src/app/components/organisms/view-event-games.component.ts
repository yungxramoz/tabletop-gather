import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbAlertModule } from '@nebular/theme';
import { GamePlan } from '../../models/game/game-plan.dto';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';
import { GameCardComponent } from '../molecules/game-card.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-games',
  imports: [NgFor, NgIf, GameCardComponent, NbAlertModule],
  template: `
    <nb-alert outline="primary" *ngIf="detailPlan && detailPlan.game !== null">
      A game has been selected for this event.
    </nb-alert>
    <ng-container *ngFor="let game of availableGames">
      <tg-game-card [game]="game"></tg-game-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventGamesComponent {
  // TODO: Delete detailPlan input if not needed
  @Input({ required: true }) public detailPlan!: DetailPlanDto | null;
  @Input({ required: true }) public availableGames!: GamePlan[] | null;
}
