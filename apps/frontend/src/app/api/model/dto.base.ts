/**
 * Base class for all DTOs.
 *
 * @property {string} id - The Db id of the entity
 */
export abstract class Dto {
  public readonly id!: string;

  /**
   * Creates a new instance of the DTO and copies the given properties.
   *
   * @template T - The type of the DTO
   * @param {Partial<T>} properties - The properties to copy
   * @param {any} json - The JSON source
   * @returns {T} - The new instance
   */
  public static fromJson<T extends Dto>(this: new () => T, json: any): T {
    return Object.assign(new this(), json);
  }
}
