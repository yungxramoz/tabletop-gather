/**
 * The JWT DTO
 *
 * @property {string} token - The JWT token
 * @property {number} expiresIn - The number of milliseconds until the token expires
 */
export type JwtDto = {
  token: string;
  expiresIn: number;
};
