import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { DateTimeGatheringDto } from '../gathering/date-time-gathering.dto';
import { UserDto } from './user.dto';

/**
 * Dto for a users which attends an event (plan).
 *
 * @property {`${UserDto['firstName']} ${UserDto['lastName']}`} fullName - The full name of the user
 * @property {DateTimeGatheringDto[]} attendingGatherings - The gatherings the user could attend
 */
export class UserPlanDto extends Dto {
  public fullName!: `${UserDto['firstName']} ${UserDto['lastName']}`;
  public attendingGatherings!: DateTimeGatheringDto[];
}

/**
 * Model for a users which attends an event (plan).
 *
 * @see {@link UserPlanDto}
 */
export type UserPlan = Model<UserPlanDto>;
