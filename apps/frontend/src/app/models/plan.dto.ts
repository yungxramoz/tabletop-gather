import { CommentDto } from './comment.dto';
import { Dto } from './dto.base';
import { GameDto } from './game.dto';
import { GatheringDto } from './gathering.dto';
import { Model } from './model.type';
import { UserDto } from './user.dto';

/**
 * Dto for plans.
 *
 * @property {string} name - The name of the plan
 * @property {string} description - The description of the plan
 * @property {boolean} isPrivate - Whether the plan is private or not
 * @property {UserDto} user - The user who created the plan
 * @property {GatheringDto[]} gatherings - The gatherings of the plan
 * @property {CommentDto[]} comments - The comments of the plan
 * @property {number} playerLimit - The player limit of the plan
 * @property {GameDto} game - The game of the plan
 */
export class PlanDto extends Dto {
  public name!: string;
  public description!: string;
  public isPrivate!: boolean;
  public user!: Model<UserDto>;
  public gatherings: GatheringDto[] = [];
  public comments: CommentDto[] = [];
  public playerLimit!: number;
  public game!: GameDto;
}
