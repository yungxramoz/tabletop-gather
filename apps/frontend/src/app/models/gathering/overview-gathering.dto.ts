import { Model } from '../../utils/types';
import { Dto } from '../base.dto';

/**
 * Dto for gathering overview.
 *
 * @property {Date} date - The date of the gathering - e.g. "2023-11-24" (YYYY-MM-DD)
 * @property {string} startTime - e.g. "18:30" The start time of the gathering
 */
export class OverviewGatheringDto extends Dto {
  public date!: Date;
  public startTime!: string;
}

export type OverviewGathering = Model<OverviewGatheringDto>;
