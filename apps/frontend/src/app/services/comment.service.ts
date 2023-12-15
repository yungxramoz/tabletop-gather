import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { API_BASE_URL } from '../app.config';
import { CommentItemDto } from '../models/comment/comment-item.dto';
import { CreateComment } from '../models/comment/create-comment.dto';
import { UpdateCommentDto } from '../models/comment/update-comment.dto';
import { PlanDto } from '../models/plan/plan.dto';
import { ResponseHandler } from '../utils/response.handler';
import { Uuid } from '../utils/types';

/**
 * Service for all comment related API calls.
 */
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly commentsUrl = `${this.apiBaseUrl}/comments`;

  public constructor(
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly http: HttpClient,
    private readonly responseHandler: ResponseHandler
  ) {}

  /**
   * Gets all comments of a plan
   *
   * @param {string} planId - The id of the plan
   * @returns {Observable<CommentItemDto[]>} - The comments
   */
  public getCommentsByPlanId(
    planId: PlanDto['id']
  ): Observable<CommentItemDto[]> {
    return this.http
      .get<{ content: object[] }>(`${this.commentsUrl}/${planId}`, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        map((response) => response?.body),
        map((commentsJson) =>
          (commentsJson?.content ?? []).map((comment: unknown) =>
            CommentItemDto.fromJson(comment)
          )
        )
      );
  }

  /**
   * Creates a new comment.
   *
   * @param {CreateComment} createComment - The comment to create
   * @returns {Observable<Uuid>} - The id of the created comment
   */
  public createComment(createComment: CreateComment): Observable<Uuid> {
    return this.http
      .post(`${this.commentsUrl}`, createComment, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        filter((response) => response !== null),
        map((response) => JSON.parse(response?.body as Uuid))
      );
  }

  /**
   * Updates a comment.
   *
   * @param {UpdateCommentDto} updateComment - The comment to update
   * @returns {Observable<Uuid>} - The id of the updated comment
   */
  public updateComment(updateComment: UpdateCommentDto): Observable<Uuid> {
    return this.http
      .put(`${this.commentsUrl}/${updateComment.id}`, updateComment, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride: 'You have successfully updated a comment',
          successTitleOverride: 'That worked! 👌',
        }),
        filter((response) => response !== null),
        map((response) => JSON.parse(response?.body as Uuid))
      );
  }

  /**
   * Deletes a comment.
   *
   * @param {Uuid} commentId - The id of the comment to delete
   * @returns {Observable<void>} - The id of the deleted comment
   */
  public deleteComment(commentId: Uuid): Observable<void> {
    return this.http
      .delete(`${this.commentsUrl}/${commentId}`, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride: 'You have successfully deleted a comment',
          successTitleOverride: 'That worked! 🤙',
        }),
        filter((response) => response !== null),
        map((response) => JSON.parse(response?.body as Uuid))
      );
  }
}
