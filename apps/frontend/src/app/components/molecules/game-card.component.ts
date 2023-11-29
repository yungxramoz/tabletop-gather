import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { BehaviorSubject, delay, of, tap } from 'rxjs';
import { GamePlan } from '../../models/game/game-plan.dto';
import { Game } from '../../models/game/game.dto';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { LazyImageComponent } from '../atoms/lazy-image.component';

@Component({
  standalone: true,
  selector: 'tg-game-card',
  imports: [
    NgIf,
    AsyncPipe,
    NgTemplateOutlet,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    TruncatePipe,
    LazyImageComponent,
  ],
  template: `
    <nb-card
      *ngIf="animation$ | async as animation"
      class="tg-animation-perspective"
      [class]="animation.className"
    >
      <nb-card-header>
        {{ game.name }}
      </nb-card-header>

      <nb-card-body>
        <!-- Frontside content -->
        <ng-container *ngIf="!animation.flipped; else backside">
          <div class="tg-flex-row tg-align-center tg-justify-beween">
            <tg-lazy-image
              class="tg-mr-2"
              [src]="game.imageUrl"
            ></tg-lazy-image>
            <div class="tg-p-1"></div>
            <div
              class="paragraph"
              [innerHTML]="game.description | truncate : 200"
            ></div>
          </div>
        </ng-container>

        <!-- Backside content -->
        <ng-template #backside>
          <div class="paragraph" [innerHTML]="game.description"></div>
        </ng-template>
      </nb-card-body>

      <nb-card-footer>
        <div class="tg-flex-row tg-justify-end">
          <div class="tg-mr-auto" *ngIf="getOwners() as owners">
            <p class="caption">Owned by {{ owners.join(', ') }}</p>
          </div>

          <div class="tg-ml-auto tg-p-1">
            <div
              class="tg-flex-row tg-align-center"
              *ngIf="getMinMaxPlayer() as playerRange"
            >
              <nb-icon
                class="tg-mr-1"
                status="primary"
                icon="people-outline"
              ></nb-icon>
              <p class="caption">{{ playerRange }}</p>
            </div>
          </div>

          <button
            nbButton
            ghost
            status="warning"
            shape="semi-round"
            (click)="toggle()"
          >
            <nb-icon icon="flip-2-outline"></nb-icon>
          </button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
  @Input({ required: true }) public game!: GamePlan | Game;

  private flipped = false;

  private readonly animationSubject = new BehaviorSubject<{
    className: string;
    flipped: boolean;
  }>({
    className: '',
    flipped: this.flipped,
  });

  public readonly animation$ = this.animationSubject.asObservable();

  public getOwners(): string[] | null {
    if ('owners' in this.game) {
      return this.game.owners;
    }

    return null;
  }

  public getMinMaxPlayer(): string | null {
    const minPlayerProp: keyof Game = 'minPlayer';
    const maxPlayerProp: keyof Game = 'maxPlayer';

    if (minPlayerProp in this.game && maxPlayerProp in this.game) {
      if (this.game[minPlayerProp] === this.game[maxPlayerProp]) {
        return `${this.game[minPlayerProp]}`;
      }
      return `${this.game[minPlayerProp]} - ${this.game[maxPlayerProp]}`;
    }

    return null;
  }
  public toggle(): void {
    of('')
      .pipe(
        tap(() =>
          this.animationSubject.next({
            className: 'tg-flip-away-animation',
            flipped: this.flipped,
          })
        ),
        delay(300),
        tap(() => (this.flipped = !this.flipped)),
        tap(() =>
          this.animationSubject.next({
            className: 'tg-flip-in-animation',
            flipped: this.flipped,
          })
        ),
        delay(300),
        tap(() =>
          this.animationSubject.next({
            className: '',
            flipped: this.flipped,
          })
        )
      )
      .subscribe();
  }
}
