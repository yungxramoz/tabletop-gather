import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { PlanDto } from '../plan/plan.dto';
import { UserDto } from '../user/user.dto';

/**
 * Dto for comments.
 *
 * @property {string} comment - The comment
 */
export class CommentDto extends Dto {
  public comment!: string;
  public user!: UserDto['id'];
  public plan!: PlanDto['id'];
}

export type Comment = Model<CommentDto>;
