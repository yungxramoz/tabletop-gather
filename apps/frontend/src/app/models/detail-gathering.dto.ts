import { Model } from '../utils/types';
import { Dto } from './dto.base';
import { GatheringDto } from './gathering.dto';

/**
 * Dto for gathering details.
 *
 * @property {GatheringDto['date']} date - The date of the gathering
 * @property {GatheringDto['startTime']} startTime - e.g. "18:30" The start time of the gathering
 * @property {number} participantCount - The number of participants of the gathering
 */
export class DetailGatheringDto extends Dto {
  public date!: GatheringDto['date'];
  public startTime!: GatheringDto['startTime'];
  public participantCount!: number;
}

export type DetailGathering = Model<DetailGatheringDto>;
