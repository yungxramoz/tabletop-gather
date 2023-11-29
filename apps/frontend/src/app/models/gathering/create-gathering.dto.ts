import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { GatheringDto } from './gathering.dto';

/**
 * Dto for creating gatherings.
 *
 * @property {GatheringDto['date']} date - The date of the gathering
 * @property {GatheringDto['startTime']} startTime - e.g. "18:30" The start time of the gathering
 */
export class CreateGatheringDto extends Dto {
  public date!: GatheringDto['date'];
  public startTime!: GatheringDto['startTime'];
}

export type CreateGathering = Model<CreateGatheringDto>;
