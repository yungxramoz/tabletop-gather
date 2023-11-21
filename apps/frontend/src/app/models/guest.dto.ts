import { Model } from '../utils/types';
import { Dto } from './dto.base';

/**
 * Dto for guests.
 *
 * @property {string} name - The name of the guest
 * @property {string} email - The email address of the guest
 */
export class GuestDto extends Dto {
  public name!: string;
  public email!: string;
}

export type Guest = Model<GuestDto>;
