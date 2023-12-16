import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { CommentItemDto } from '../../models/comment/comment-item.dto';
import { CreateComment } from '../../models/comment/create-comment.dto';
import { UpdateCommentDto } from '../../models/comment/update-comment.dto';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';
import { UserDto } from '../../models/user/user.dto';
import { InputComponent } from '../atoms/input.component';
import { VoidComponent } from '../atoms/void.component';
import {
  CommentFormComponent,
  CommentFormEvent,
} from './comment-form.component';
import { CommentComponent } from './comment.component';

@Component({
  standalone: true,
  selector: 'tg-view-event-comments',
  imports: [
    NgFor,
    NgIf,
    ViewEventCommentsComponent,
    CommentComponent,
    InputComponent,
    NbCardModule,
    VoidComponent,
    CommentFormComponent,
  ],
  template: `
    <div class="tg-mb-4">
      <ng-container *ngIf="comments?.length; else noComments">
        <tg-comment
          class="tg-mb-2 tg-block"
          *ngFor="let comment of comments"
          [comment]="comment"
          [isOwner]="user?.firstName + ' ' + user?.lastName === comment.user"
          (commentUpdate)="onCommentUpdate($event)"
          (commentDelete)="onCommentDelete($event)"
        ></tg-comment>
      </ng-container>

      <ng-template #noComments>
        <tg-void message="No comments yet"></tg-void>
      </ng-template>
    </div>

    <nb-card>
      <nb-card-header>Add a new Comment</nb-card-header>

      <nb-card-body>
        <tg-comment-form
          textareaLabel="Comment"
          buttonLabel="Add"
          [comment]="null"
          (commentSubmitted)="onCommentCreate($event)"
        ></tg-comment-form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventCommentsComponent {
  @Input({ required: true }) public detailPlan!: DetailPlanDto;
  @Input({ required: true }) public user!: UserDto | null;
  @Input({ required: true }) public comments!: CommentItemDto[] | null;
  @Output() public commentCreate: EventEmitter<CreateComment> =
    new EventEmitter<CreateComment>();
  @Output() public commentUpdate: EventEmitter<UpdateCommentDto> =
    new EventEmitter<UpdateCommentDto>();
  @Output() public commentDelete: EventEmitter<CommentItemDto> =
    new EventEmitter<CommentItemDto>();

  public onCommentCreate(event: CommentFormEvent): void {
    const comment: CreateComment = {
      comment: event['comment'],
      planId: this.detailPlan.id,
    };

    this.commentCreate.emit(comment);
  }

  public onCommentUpdate(event: UpdateCommentDto): void {
    this.commentUpdate.emit(event);
  }

  public onCommentDelete(event: CommentItemDto): void {
    this.commentDelete.emit(event);
  }
}
