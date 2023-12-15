import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { PlanDto } from '../plan/plan.dto';
import { UserDto } from '../user/user.dto';

/**
 * Dto for comments.
 *
 * @property {string} comment - The comment
 * @property {UserDto['id']} user - The users id
 * @property {PlanDto['id']} plan - The plan id
 * @property {Date} dateCreated - The date on which this comment was created
 * @extends {Dto}
 */
export class CommentItemDto extends Dto {
  public comment!: string;
  public user!: UserDto['id'];
  public plan!: PlanDto['id'];
  public dateCreated!: Date;
}

export type CommentItem = Model<CommentItemDto>;
