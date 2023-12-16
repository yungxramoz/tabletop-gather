import { Pipe, PipeTransform } from '@angular/core';
import { CommentItem } from '../models/comment/comment-item.dto';

type SortableComment = Pick<CommentItem, 'dateCreated'>;

/**
 * Sorts comments by date created
 * @example
 * <div *ngFor="let comment of comments | sortComments">
 *
 * @template T - The type of comment to sort
 * @implements {PipeTransform}
 */
@Pipe({ name: 'sortComments', pure: false, standalone: true })
export class SortCommentsPipe<T extends SortableComment>
  implements PipeTransform
{
  /**
   * Sorts comments by date created
   *
   * @param {T[] | null} value - The comments to sort
   * @returns {T[] | null} The sorted comments
   */
  public transform(value: T[] | null): T[] | null {
    if (!value) {
      return value;
    }

    return value.sort((a, b) => {
      if (a.dateCreated < b.dateCreated) {
        return -1;
      } else if (a.dateCreated > b.dateCreated) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
