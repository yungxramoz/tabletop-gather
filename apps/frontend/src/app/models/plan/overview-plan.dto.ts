import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { GameDto } from '../game/game.dto';

/**
 * Dto for plan overview
 *
 * @property {string} name - The name of the plan
 * @property {string} description - The description of the plan
 * @property {boolean} isPrivate - Whether the plan is private or not
 * @property {number} playerLimit - The player limit of the plan
 * @property {string} ownerName - The name of the owner of the plan
 * @property {GameDto} game - The game of the plan
 * @property {Date[]} gatheringDates - The dates of the gatherings of the plan
 */
export class OverviewPlanDto extends Dto {
  public name!: string;
  public isPrivate!: boolean;
  public description!: string;
  public playerLimit!: number;
  public ownerName!: string;
  public game?: GameDto;
  public gatheringDates!: Date[];
}

export type OverviewPlan = Model<OverviewPlanDto>;
