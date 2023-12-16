import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncates a string to a specified length and appends a suffix.
 * @example
 * <p>{{ 'This is a really long string that should be truncated' | truncate:20 }}</p>
 * <p>{{ 'This is a really long string that should be truncated' | truncate:20:'...' }}</p>
 *
 * @implements {PipeTransform}
 */
@Pipe({ name: 'truncate', pure: false, standalone: true })
export class TruncatePipe implements PipeTransform {
  /**
   * Truncates a string to a specified length and appends a suffix.
   *
   * @param {string | undefined | null} value - The string to truncate.
   * @param {number} maxLength - The maximum length of the string. Defaults to 130.
   * @param {string} suffix - The suffix to append to the truncated string. Defaults to '...'.
   * @returns {string | undefined | null} The truncated string.
   */
  public transform(
    value: string | undefined | null,
    maxLength = 130,
    suffix = ' ...'
  ): string | undefined | null {
    if (!value) {
      return value;
    }

    return value.length > maxLength
      ? value.substring(0, maxLength) + suffix
      : value;
  }
}
