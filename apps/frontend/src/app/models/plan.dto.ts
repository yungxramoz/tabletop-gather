import { Model } from '../utils/types';
import { Dto } from './base.dto';
import { GameDto } from './game.dto';
import { UserDto } from './user.dto';

/**
 * Dto for creating plans.
 *
 * @property {string} name - The name of the plan
 * @property {string} description - The description of the plan
 * @property {boolean} isPrivate - Whether the plan is private or not
 * @property {number} playerLimit - The player limit of the plan
 * @property {User['id']} user - The user of the plan
 * @property {GameDto['id']} game - The game of the plan
 */
export class PlanDto extends Dto {
  public name!: string;
  public isPrivate!: boolean;
  public description!: string;
  public playerLimit!: number;
  public user!: UserDto['id'];
  public game!: GameDto['id'];
}

export type Plan = Model<PlanDto>;
