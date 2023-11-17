/**
 * The result of a successful login request.
 *
 * @property {string} token - The JWT token
 * @property {number} expiresIn - The number of milliseconds until the token expires
 */
export type LoginResponse = {
  token: string;
  expiresIn: number;
};
