import { FormControl, FormGroup } from '@angular/forms';
import { Dto } from '../models/dto.base';

/**
 * Type for a single digit.
 */
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Type for a UUID.
 */
export type Uuid = string;

/**
 * Model type for Dtos. Removes the `id` property.
 *
 * @template T - The type of the Dto
 */
export type Model<T extends Dto> = Omit<T, keyof Dto>;

/**
 * Applies T to all properties of a FormGroup.
 *
 * @template T - The type of the Dto
 */
export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;
