import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { PlanDto } from '../plan/plan.dto';

/**
 * Dto for creating comments.
 *
 * @property {string} comment - The comment
 * @property {PlanDto['id']} plan - The plan id
 * @extends {Dto}
 */
export class CreateCommentDto extends Dto {
  public comment!: string;
  public plan!: PlanDto['id'];
}

export type CreateComment = Model<CreateCommentDto>;
