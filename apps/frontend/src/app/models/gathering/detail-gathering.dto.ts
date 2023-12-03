import { Model } from '../../utils/types';
import { Dto } from '../base.dto';

/**
 * Dto for gathering details.
 *
 * @property {Date} date - The date of the gathering - e.g. "2023-11-24" (YYYY-MM-DD)
 * @property {string} startTime - e.g. "18:30" The start time of the gathering
 * @property {number} participantCount - The number of participants of the gathering
 */
export class DetailGatheringDto extends Dto {
  public date!: Date;
  public startTime!: string;
  public participantCount!: number;
}

export type DetailGathering = Model<DetailGatheringDto>;
