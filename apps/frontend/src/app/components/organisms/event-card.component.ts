import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { OverviewGatheringDto } from '../../models/gathering/overview-gathering.dto';
import { OverviewPlanDto } from '../../models/plan/overview-plan.dto';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { getDateCHFormat } from '../../utils/date.utility';
import { GatheringDateComponent } from '../atoms/gathering-date.component';

@Component({
  standalone: true,
  selector: 'tg-event-card',
  imports: [
    NgIf,
    NgFor,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    TruncatePipe,
    GatheringDateComponent,
  ],
  template: `
    <nb-card>
      <nb-card-header
        class="tg-clickable"
        (click)="cardClicked.emit()"
        (keydown.enter)="cardClicked.emit()"
        role="button"
        tabindex="0"
      >
        <div class="tg-flex-row tg-justify-between">
          <div class="tg-flex-col tg-align-start">
            <p class="caption-2">
              <ng-container
                *ngFor="let gathering of overviewPlanDto.gatheringDtos"
              >
                <tg-gathering-date
                  [date]="gathering"
                  [dateOnly]="true"
                ></tg-gathering-date>
              </ng-container>
            </p>
            {{ overviewPlanDto.name }}
          </div>
          <nb-icon
            icon="lock-outline"
            status="warning"
            *ngIf="overviewPlanDto.isPrivate"
          ></nb-icon>
        </div>
      </nb-card-header>
      <nb-card-body
        class="tg-clickable"
        (click)="cardClicked.emit()"
        (keydown.enter)="cardClicked.emit()"
        role="button"
      >
        {{ overviewPlanDto.description | truncate }}
      </nb-card-body>
      <nb-card-footer>
        <div class="tg-flex-row tg-justify-end">
          <div class="tg-mr-auto">
            <p class="caption">by {{ overviewPlanDto.ownerName }}</p>
          </div>

          <ng-container *ngIf="isOwner">
            <button
              nbButton
              ghost
              status="danger"
              shape="semi-round"
              (click)="deleteClicked.emit()"
            >
              <nb-icon icon="trash-2-outline"></nb-icon>
            </button>

            <div class="tg-m-1"></div>

            <button
              nbButton
              ghost
              status="warning"
              shape="semi-round"
              (click)="editClicked.emit()"
            >
              <nb-icon icon="edit-2-outline"></nb-icon>
            </button>
          </ng-container>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  @Input({ required: true }) public overviewPlanDto!: OverviewPlanDto;
  @Input() public isOwner = false;

  @Output()
  public cardClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  public deleteClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  public editClicked: EventEmitter<void> = new EventEmitter();

  public getGatheringDatesShort(gatherings: OverviewGatheringDto[]): string {
    const dates = gatherings.map((gathering) =>
      getDateCHFormat(gathering.date)
    );
    return [...new Set(dates)].join(' | ');
  }
}
