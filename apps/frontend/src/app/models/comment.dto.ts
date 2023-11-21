import { Dto } from './dto.base';
import { Model } from './model.type';

/**
 * Dto for comments.
 *
 * @property {string} comment - The comment
 */
export class CommentDto extends Dto {
  public comment!: string;
}

export type Comment = Model<CommentDto>;
