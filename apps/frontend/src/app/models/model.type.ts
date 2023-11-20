import { Dto } from './dto.base';

/**
 * Model type for Dtos. Removes the `id` property.
 *
 * @template T - The type of the DTO
 */
export type Model<T extends Dto> = Omit<T, keyof Dto>;
