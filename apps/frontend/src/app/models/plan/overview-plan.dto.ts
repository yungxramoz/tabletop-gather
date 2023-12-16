import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { GameDto } from '../game/game.dto';
import { OverviewGatheringDto } from '../gathering/overview-gathering.dto';

/**
 * Dto for plan overview
 *
 * @property {string} name - The name of the plan
 * @property {string} description - The description of the plan
 * @property {boolean} isPrivate - Whether the plan is private or not
 * @property {number} playerLimit - The player limit of the plan
 * @property {string} ownerName - The name of the owner of the plan
 * @property {GameDto} game - The game of the plan
 * @property {OverviewGatheringDto[]} gatheringDtos - The gatherings of the plan
 */
export class OverviewPlanDto extends Dto {
  public name!: string;
  public isPrivate!: boolean;
  public description!: string;
  public playerLimit!: number;
  public ownerName!: string;
  public game?: GameDto;
  public gatheringDtos!: OverviewGatheringDto[];
}

/**
 * Model for plan overview
 *
 * @see {@link OverviewPlanDto}
 */
export type OverviewPlan = Model<OverviewPlanDto>;
