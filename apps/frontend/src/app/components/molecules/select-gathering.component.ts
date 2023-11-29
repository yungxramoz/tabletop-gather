import { NgFor } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbCheckboxModule } from '@nebular/theme';
import { Dto } from '../../models/base.dto';
import { UpsertGatheringDto } from '../../models/gathering/upsert-gathering.dto';
import { DetailPlan } from '../../models/plan/detail-plan.dto';
import { GatheringDateComponent } from '../atoms/gathering-date.component';

@Component({
  standalone: true,
  selector: 'tg-select-gathering',
  imports: [NgFor, FormsModule, NbCheckboxModule, GatheringDateComponent],
  template: `
    <div class="tg-p-1">
      <p class="label">Options</p>
      <form #selectedGatheringsForm="ngForm">
        <nb-checkbox
          [ngModel]
          [name]="gathering.id"
          *ngFor="let gathering of gatherings; index as i"
          status="primary"
          class="tg-block tg-pt-1"
        >
          <tg-gathering-date [date]="gathering"></tg-gathering-date>
          <p>
            <i>{{ gathering.participantCount }} Participants</i>
          </p>
        </nb-checkbox>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGatheringComponent implements AfterViewInit {
  @ViewChild('selectedGatheringsForm') public readonly ngForm!: NgForm;

  @Input({ required: true }) public gatherings!: DetailPlan['gatherings'];

  @Output()
  public readonly gatheringUpserted: EventEmitter<UpsertGatheringDto[]> =
    new EventEmitter<UpsertGatheringDto[]>();

  public ngAfterViewInit(): void {
    this.ngForm.form.valueChanges.subscribe(
      (values: Record<Dto['id'], boolean>) => {
        const upsertGatheringDtos: UpsertGatheringDto[] = Object.entries(
          values
        ).map(([id, canAttend]) => {
          return { id, canAttend };
        });

        this.gatheringUpserted.emit(upsertGatheringDtos);
      }
    );
  }
}
