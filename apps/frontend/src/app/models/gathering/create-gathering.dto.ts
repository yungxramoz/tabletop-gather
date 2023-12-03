import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { DetailGatheringDto } from './detail-gathering.dto';

/**
 * Dto for creating gatherings.
 *
 * @property {DetailGatheringDto['date']} date - The date of the gathering
 * @property {DetailGatheringDto['startTime']} startTime - e.g. "18:30" The start time of the gathering
 */
export class CreateGatheringDto extends Dto {
  public date!: DetailGatheringDto['date'];
  public startTime!: DetailGatheringDto['startTime'];
}

export type CreateGathering = Model<CreateGatheringDto>;
