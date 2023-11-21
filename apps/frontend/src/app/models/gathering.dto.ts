import { Model } from '../utils/types';
import { Dto } from './dto.base';
import { Guest } from './guest.dto';
import { User } from './user.dto';

/**
 * Dto for gatherings.
 *
 * @property {Date} date - The date of the gathering
 * @property {string} startTime - The start time of the gathering
 * @property {Guest[]} guests - The guests of the gathering
 * @property {User[]} users - The users of the gathering
 * @property {PlanDto} plan - The plan of the gathering
 */
export class GatheringDto extends Dto {
  public date!: Date;
  public startTime!: string;
  public guests: Guest[] = [];
  public users: User[] = [];
}

export type Gathering = Model<GatheringDto>;
