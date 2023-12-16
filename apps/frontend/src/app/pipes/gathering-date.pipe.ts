import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeGathering } from '../models/gathering/date-time-gathering.dto';
import { DetailGathering } from '../models/gathering/detail-gathering.dto';
import { OverviewGathering } from '../models/gathering/overview-gathering.dto';
import { get24HourTime, getDateCHFormat } from '../utils/date.utility';

/**
 * Formats a gathering date
 * @example
 * <p>{{ gathering.date | gatheringDate }}</p>
 * <p>{{ gathering.date | gatheringDate: true }}</p>
 *
 * @template T - The type of comment to sort
 * @implements {PipeTransform}
 */
@Pipe({ name: 'gatheringDate', pure: false, standalone: true })
export class GatheringDatePipe<
  T extends Date | DetailGathering | DateTimeGathering | OverviewGathering
> implements PipeTransform
{
  /**
   * Formats a gathering date
   *
   * @param {T | null} value - The gathering to format the date for. Can be of type {@link Date}, {@link DetailGathering}, {@link DateTimeGathering} or {@link OverviewGathering}
   * @param {boolean} dateOnly - Whether to only display the date or also the time. Defaults to false.
   * @returns {string} The formatted date
   */
  public transform(value: T | null, dateOnly: boolean): string {
    if (!value) {
      return '';
    }

    if (dateOnly) {
      return this.getDateString(value);
    }

    const timeString =
      value instanceof Date ? get24HourTime(value) : value.startTime;
    return `${this.getDateString(value)} at ${timeString}`;
  }

  /**
   * Formats a gathering date
   *
   * @param {T} data - The gathering to format the date for.
   * @returns {string} The formatted date
   */
  private getDateString(data: T) {
    if (data instanceof Date) {
      return getDateCHFormat(data);
    }
    return getDateCHFormat(data.date);
  }
}
