import { Dto } from './dto.base';
import { GuestDto } from './guest.dto';
import { Model } from './model.type';
import { UserDto } from './user.dto';

/**
 * Dto for gatherings.
 *
 * @property {Date} date - The date of the gathering
 * @property {string} startTime - The start time of the gathering
 * @property {string} endTime - The end time of the gathering
 * @property {Model<GuestDto>[]} guests - The guests of the gathering
 * @property {Model<UserDto>[]} users - The users of the gathering
 * @property {PlanDto} plan - The plan of the gathering
 */
export class GatheringDto extends Dto {
  public date!: Date;
  public startTime!: string;
  public endTime!: string;
  public guests: Model<GuestDto>[] = [];
  public users: Model<UserDto>[] = [];
}

export type Gathering = Model<GatheringDto>;
