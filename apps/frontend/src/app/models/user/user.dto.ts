import { Model } from '../../utils/types';
import { Dto } from '../base.dto';

/**
 * Dto for users.
 *
 * @property {string} username - The username of the user
 * @property {string} firstName - The first name of the user
 * @property {string} lastName - The last name of the user
 * @property {string} email - The email address of the user
 */
export class UserDto extends Dto {
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
}

export type User = Model<UserDto>;
