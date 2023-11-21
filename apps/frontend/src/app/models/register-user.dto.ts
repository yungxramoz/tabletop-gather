import { Dto } from './dto.base';
import { Model } from './model.type';

/**
 * Dto for registering a user.
 *
 * @property {string} username - The username of the user
 * @property {string} firstName - The first name of the user
 * @property {string} lastName - The last name of the user
 * @property {string} email - The email address of the user
 * @property {string} password - The password of the user
 */
export class RegisterUserDto extends Dto {
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
}

export type RegisterUser = Model<RegisterUserDto>;
