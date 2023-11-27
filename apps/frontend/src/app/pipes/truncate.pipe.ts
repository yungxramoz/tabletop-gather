import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', pure: false, standalone: true })
export class TruncatePipe implements PipeTransform {
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
