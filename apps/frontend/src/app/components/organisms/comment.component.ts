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
    <nb-card class="tg-w-90 tg-my-0" [class.tg-right]="isOwner">
      <nb-card-header>
        <div class="tg-flex-row tg-justify-between">
          <div class="tg-flex-col tg-align-start">
            <p class="caption-2">
              {{ getDateCreated(comment.dateCreated) }}
            </p>
            {{ isOwner ? 'You' : comment.user }}
          </div>

          <button
            *ngIf="isOwner; else noEdit"
            nbButton
            ghost
            status="warning"
            shape="semi-round"
            (click)="editing = !editing"
          >
            <nb-icon icon="edit-2-outline"></nb-icon>
          </button>

          <ng-template #noEdit>
            <nb-icon icon="message-square-outline"></nb-icon>
          </ng-template>
        </div>
      </nb-card-header>

      <nb-card-body>
        <div [innerHTML]="comment.comment"></div>
      </nb-card-body>

      <nb-card-footer *ngIf="editing">
        <tg-comment-form
          [comment]="comment.comment"
          textareaLabel="Edit comment"
          buttonLabel="Update"
          (commentSubmitted)="onCommentUpdated($event)"
        ></tg-comment-form>
      </nb-card-footer>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input({ required: true }) public comment!: CommentItemDto;
  @Input() public isOwner = false;
  @Output() public commentUpdated: EventEmitter<UpdateCommentDto> =
    new EventEmitter<UpdateCommentDto>();

  public editing = false;

  public getDateCreated(date: Date): string {
    return getDateCHFormat(date) + ' at ' + get24HourTime(date);
  }

  public onCommentUpdated(event: CommentFormEvent): void {
    this.editing = false;
    this.comment.dateCreated = new Date();
    this.comment.comment = event['comment'];

    const updateCommentDto: UpdateCommentDto = {
      ...this.comment,
      comment: event['comment'],
    };

    this.commentUpdated.emit(updateCommentDto);
  }
}
