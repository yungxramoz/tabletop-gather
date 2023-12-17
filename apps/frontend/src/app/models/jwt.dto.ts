import { Model } from '../utils/types';
import { Dto } from './base.dto';

/**
 * Dto for Jwt tokens
 *
 * @property {string} token - The Jwt
 * @property {number} expiresIn - The number of milliseconds until the token expires
 */
export class JwtDto extends Dto {
  public token!: string;
  public expiresIn!: number;
}

/**
 * Model for Jwt tokens
 *
 * @see {@link JwtDto}
 */
export type Jwt = Model<JwtDto>;
