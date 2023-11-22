import { Model } from '../utils/types';
import { Dto } from './dto.base';

/**
 * Dto for logging in a user.
 *
 * @property {string} email - The email address of the user
 * @property {string} password - The password of the user
 */
export class LoginUserDto extends Dto {
  public email!: string;
  public password!: string;
}

export type LoginUser = Model<LoginUserDto>;
