import { Model } from '../../utils/types';
import { Dto } from '../base.dto';
import { UserUpdate } from './user-update.dto';

/**
 * Dto for updating a user's password.
 *
 * @property {UserUpdate['email']} email - The email address of the user
 * @property {UserUpdate['password']} password - The password of the user
 * @property {UserUpdate['password']} newPassword - The new password of the user
 */
export class PasswordUpdateDto extends Dto {
  public email!: UserUpdate['email'];
  public password!: UserUpdate['password'];
  public newPassword!: UserUpdate['password'];
}

export type PasswordUpdate = Model<PasswordUpdateDto>;
