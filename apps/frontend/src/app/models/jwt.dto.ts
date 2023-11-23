import { Model } from '../utils/types';
import { Dto } from './dto.base';

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

export type Jwt = Model<JwtDto>;
