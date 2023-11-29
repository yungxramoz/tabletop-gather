import { Model } from '../../utils/types';
import { Dto } from '../base.dto';

/**
 * Dto for games.
 *
 * @property {string} name - The name of the game
 * @property {string} description - The description of the game
 * @property {number} minPlayer - The minimum number of players for the game
 * @property {number} maxPlayer - The maximum number of players for the game
 * @property {string} imageUrl - The image url of the game
 */
export class GameDto extends Dto {
  public name!: string;
  public description!: string;
  public minPlayer!: number;
  public maxPlayer!: number;
  public imageUrl!: string;
}

export type Game = Model<GameDto>;
