import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { DateTimeGathering } from '../gathering/date-time-gathering.dto';
import { GameOwnersDto } from './game-owners.dto';

/**
 * Dto for a game which users of a plan might own
 *
 * @property {DateTimeGathering} gatheringDto - The date and time of the gathering
 * @property {string[]} owners - The attendees who own this game
 * @extends {Dto}
 */
export class GamePlanDto extends Dto {
  public gatheringDto!: DateTimeGathering; // Use the model bc we don't get the id
  public games!: GameOwnersDto[];
}

/**
 * Model for a game which users of a plan might own
 *
 * @see {@link GamePlanDto}
 */
export type GamePlan = Model<GamePlanDto>;
