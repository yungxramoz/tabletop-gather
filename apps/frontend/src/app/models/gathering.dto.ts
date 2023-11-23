import { Model } from '../utils/types';
import { Dto } from './dto.base';
import { GuestDto } from './guest.dto';
import { UserDto } from './user.dto';

/**
 * Dto for gatherings.
 *
 * @property {Date} date - The date of the gathering
 * @property {string} startTime - e.g. "18:30" The start time of the gathering
 * @property {GuestDto['id'][]} guests - The guests of the gathering
 * @property {UserDto['id'][]} users - The users of the gathering
 */
export class GatheringDto extends Dto {
  public date!: Date;
  public startTime!: string;
  public guests: GuestDto['id'][] = [];
  public users: UserDto['id'][] = [];
}

export type Gathering = Model<GatheringDto>;
