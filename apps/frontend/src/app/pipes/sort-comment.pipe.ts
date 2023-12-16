import { Pipe, PipeTransform } from '@angular/core';
import { CommentItem } from '../models/comment/comment-item.dto';

type SortableComment = Pick<CommentItem, 'dateCreated'>;

@Pipe({ name: 'sortComments', pure: false, standalone: true })
export class SortCommentsPipe<T extends SortableComment>
  implements PipeTransform
{
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
