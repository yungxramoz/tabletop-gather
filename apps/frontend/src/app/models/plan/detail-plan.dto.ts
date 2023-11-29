import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { GameDto } from '../game/game.dto';
import { DetailGatheringDto } from '../gathering/detail-gathering.dto';
import { UserDto } from '../user/user.dto';

/**
 * Dto for plan details.
 *
 * @property {string} name - The name of the plan
 * @property {string} description - The description of the plan
 * @property {boolean} isPrivate - Whether the plan is private or not
 * @property {number} playerLimit - The player limit of the plan
 * @property {UserDto} owner - The owner of the plan
 * @property {GameDto} game - The game of the plan
 * @property {DetailGatheringDto[]} gatherings - The gatherings of the plan
 */
export class DetailPlanDto extends Dto {
  public name!: string;
  public isPrivate!: boolean;
  public description!: string;
  public playerLimit!: number;
  public owner!: UserDto;
  public game?: GameDto;
  public gatherings: DetailGatheringDto[] = [];
}

export type DetailPlan = Model<DetailPlanDto>;
