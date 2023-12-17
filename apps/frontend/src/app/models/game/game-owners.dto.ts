import { Model } from '../../utils/types';
import { GameDto } from './game.dto';

/**
 * Dto for a game which users of a plan own
 *
 * @property {string[]} owners - The attendees who own this game
 * @extends {GameDto}
 */
export class GameOwnersDto extends GameDto {
  public owners!: string[];
}

/**
 * Model for a game which users of a plan own
 *
 * @see {@link GameOwnersDto}
 */
export type GameOwners = Model<GameOwnersDto>;
