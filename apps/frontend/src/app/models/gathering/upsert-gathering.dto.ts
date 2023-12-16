import { Model } from '../../utils/types';
import { Dto } from '../base.dto';

/**
 * Dto for upserting a gathering.
 *
 * @property {boolean}
 */
export class UpsertGatheringDto extends Dto {
  public canAttend!: boolean;
}

/**
 * Model for upserting a gathering.
 *
 * @see {@link UpsertGatheringDto}
 */
export type UpsertGathering = Model<UpsertGatheringDto>;
