import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { Gathering } from './gathering.dto';

/**
 * Dto for gathering details.
 *
 * @property {Gathering['date']} date - The date of the gathering - e.g. "2023-11-24" (YYYY-MM-DD)
 * @property {Gathering['startTime']} startTime - e.g. "18:30" The start time of the gathering
 * @property {number} participantCount - The number of participants of the gathering
 */
export class DetailGatheringDto extends Dto {
  public date!: Gathering['date'];
  public startTime!: Gathering['startTime'];
  public participantCount!: number;
}

export type DetailGathering = Model<DetailGatheringDto>;
