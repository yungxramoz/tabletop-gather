import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { Game } from '../../models/game.dto';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { LazyImageComponent } from '../atoms/lazy-image.component';

@Component({
  standalone: true,
  selector: 'tg-game-card',
  imports: [
    NgIf,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    TruncatePipe,
    LazyImageComponent,
  ],
  template: `
    <nb-flip-card #flipCard [showToggleButton]="false">
      <nb-card-front>
        <nb-card>
          <nb-card-header>
            {{ game.name }}
          </nb-card-header>

          <nb-card-body>
            <div class="tg-flex-row tg-align-center tg-justify-beween">
              <tg-lazy-image
                class="tg-mr-2"
                [src]="game.imageUrl"
              ></tg-lazy-image>
              <p class="tg-p-1"></p>
              <p>{{ game.description | truncate }}</p>
            </div>
          </nb-card-body>

          <nb-card-footer>
            <div class="tg-flex-row tg-justify-end">
              <div class="tg-mr-auto">
                <p *ngIf="owners as o" class="caption">
                  Owned by {{ o.join(', ') }}
                </p>
              </div>

              <button
                nbButton
                ghost
                status="warning"
                shape="semi-round"
                (click)="flipCard.toggle()"
              >
                <nb-icon icon="flip-2-outline"></nb-icon>
              </button>
            </div>
          </nb-card-footer>
        </nb-card>
      </nb-card-front>

      <nb-card-back>
        <nb-card>
          <nb-card-header>
            {{ game.name }}
          </nb-card-header>

          <nb-card-body>
            <p *ngIf="flipCard.flipped">{{ game.description }}</p>
          </nb-card-body>

          <nb-card-footer>
            <div class="tg-flex-row tg-justify-end">
              <div class="tg-mr-auto">
                <p *ngIf="owners as o" class="caption">
                  Owned by {{ o.join(', ') }}
                </p>
              </div>

              <button
                nbButton
                ghost
                status="warning"
                shape="semi-round"
                (click)="flipCard.toggle()"
              >
                <nb-icon icon="flip-2-outline"></nb-icon>
              </button>
            </div>
          </nb-card-footer>
        </nb-card>
      </nb-card-back>
    </nb-flip-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
  @Input({ required: true }) public game!: Game;
  @Input({ required: true }) public owners!: string[] | null;
}
