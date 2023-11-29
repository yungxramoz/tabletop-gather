import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { Game } from './game.dto';

/**
 * Dto for a game which users of a plan might own
 *
 * @property {Game['name']} name - The name of the game
 * @property {Game['description']} description - The description of the game
 * @property {Game['imageUrl']} imageUrl - The image url of the game
 * @property {string[]} owners - The attendees who own this game
 */
export class GamePlanDto extends Dto {
  public name!: Game['name'];
  public description!: Game['description'];
  public imageUrl!: Game['imageUrl'];
  public owners!: string[];
}

export type GamePlan = Model<GamePlanDto>;
