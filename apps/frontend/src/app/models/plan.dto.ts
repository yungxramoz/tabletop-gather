import { Model } from '../utils/types';
import { Comment } from './comment.dto';
import { Dto } from './dto.base';
import { GameDto } from './game.dto';
import { Gathering } from './gathering.dto';
import { User } from './user.dto';

/**
 * Dto for creating plans.
 *
 * @property {string} name - The name of the plan
 * @property {string} description - The description of the plan
 * @property {boolean} isPrivate - Whether the plan is private or not
 * @property {User} user - The user who created the plan
 * @property {Gathering[]} gatherings - The gatherings of the plan
 * @property {Comment[]} comments - The comments of the plan
 * @property {number} playerLimit - The player limit of the plan
 * @property {GameDto} game - The game of the plan
 */
export class PlanDto extends Dto {
  public name!: string;
  public description!: string;
  public isPrivate!: boolean;
  public user!: User;
  public gatherings: Gathering[] = [];
  public comments: Comment[] = [];
  public playerLimit!: number;
  public game!: GameDto;
}

export type Plan = Model<PlanDto>;
