import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { CommentItemDto } from '../../models/comment/comment-item.dto';
import { UpdateCommentDto } from '../../models/comment/update-comment.dto';
import { get24HourTime, getDateCHFormat } from '../../utils/date.utility';
import { TextareaComponent } from '../atoms/textarea.component';
import {
  CommentFormComponent,
  CommentFormEvent,
} from './comment-form.component';

@Component({
  standalone: true,
  selector: 'tg-comment',
  imports: [
    NgIf,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    TextareaComponent,
    CommentFormComponent,
  ],
  template: `
    <nb-card
      class="tg-w-90 tg-my-0"
      [class.tg-right]="isOwner"
      [class.tg-primary-border]="isOwner"
    >
      <nb-card-body>
        <div class="tg-flex-row tg-justify-between">
          <div class="tg-flex-col tg-align-start">
            <p class="caption-2">
              {{ isOwner ? 'You' : comment.user }} commented on
              {{ getDateCreated(comment.dateCreated) }}
            </p>
          </div>

          <div *ngIf="isOwner; else noEdit" class="tg-flex-row tg-justify-end">
            <button
              nbButton
              ghost
              status="danger"
              shape="semi-round"
              (click)="onCommentDelete()"
            >
              <nb-icon icon="trash-2-outline"></nb-icon>
            </button>

            <button
              nbButton
              ghost
              status="warning"
              shape="semi-round"
              (click)="editing = !editing"
            >
              <nb-icon icon="edit-2-outline"></nb-icon>
            </button>
          </div>

          <ng-template #noEdit>
            <nb-icon icon="message-square-outline"></nb-icon>
          </ng-template>
        </div>
        <div [innerHTML]="comment.comment"></div>
      </nb-card-body>

      <nb-card-footer *ngIf="editing">
        <tg-comment-form
          [comment]="comment.comment"
          textareaLabel="Edit comment"
          buttonLabel="Update"
          (commentSubmitted)="onCommentUpdate($event)"
        ></tg-comment-form>
      </nb-card-footer>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input({ required: true }) public comment!: CommentItemDto;
  @Input() public isOwner = false;
  @Output() public commentUpdate: EventEmitter<UpdateCommentDto> =
    new EventEmitter<UpdateCommentDto>();
  @Output() public commentDelete: EventEmitter<CommentItemDto> =
    new EventEmitter<CommentItemDto>();

  public editing = false;

  public getDateCreated(date: Date): string {
    return getDateCHFormat(date) + ' at ' + get24HourTime(date);
  }

  public onCommentUpdate(event: CommentFormEvent): void {
    this.editing = false;
    this.comment.dateCreated = new Date();
    this.comment.comment = event['comment'];

    const updateCommentDto: UpdateCommentDto = {
      ...this.comment,
      comment: event['comment'],
    };

    this.commentUpdate.emit(updateCommentDto);
  }

  public onCommentDelete(): void {
    this.commentDelete.emit(this.comment);
  }
}
