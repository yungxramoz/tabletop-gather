import { UserDto } from './user.dto';

/**
 * Dto for user updates.
 *
 * @property {string} password - The password of the user
 *
 * @extends {UserDto}
 */
export class UserUpdateDto extends UserDto {
  public password!: string;
}