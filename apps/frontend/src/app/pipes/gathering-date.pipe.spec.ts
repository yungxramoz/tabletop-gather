import { DateTimeGathering } from '../models/gathering/date-time-gathering.dto';
import { DetailGathering } from '../models/gathering/detail-gathering.dto';
import { OverviewGathering } from '../models/gathering/overview-gathering.dto';
import { GatheringDatePipe } from './gathering-date.pipe';

describe('GatheringDatePipe', () => {
  const universal: DetailGathering | DateTimeGathering | OverviewGathering = {
    date: new Date('2022-01-01T12:00:00'),
    startTime: '14:00',
    participantCount: 0,
  };

  let pipe: GatheringDatePipe<typeof universal>;

  beforeEach(() => {
    pipe = new GatheringDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return an empty string if value is null', () => {
      // Arrange
      const value = null;
      const dateOnly = false;

      // Act
      const result = pipe.transform(value, dateOnly);

      // Assert
      expect(result).toEqual('');
    });

    it('should return the formatted date without time if dateOnly is true', () => {
      // Arrange
      const value = new Date('2022-01-01T12:00:00');
      const dateOnly = true;

      // Act
      const result = (pipe as unknown as GatheringDatePipe<Date>).transform(
        value,
        dateOnly
      );

      // Assert
      expect(result).toEqual('01.01.2022');
    });

    it('should return the formatted date with time if dateOnly is false', () => {
      // Arrange
      const value = {
        date: new Date('2022-01-01T12:00:00'),
        startTime: '14:00',
        participantCount: 0,
      };
      const dateOnly = false;

      // Act
      const result = pipe.transform(value, dateOnly);

      // Assert
      expect(result).toEqual('01.01.2022 at 14:00');
    });
  });

  describe('getDateString', () => {
    it('should return the formatted date for a Date object', () => {
      // Arrange
      const data = new Date('2022-01-01T12:00:00');

      // Act
      const result = (pipe as unknown as GatheringDatePipe<Date>)[
        'getDateString'
      ](data);

      // Assert
      expect(result).toEqual('01.01.2022');
    });

    it('should return the formatted date for a data object with a date property', () => {
      // Arrange
      const data = {
        date: new Date('2022-01-01T12:00:00'),
        startTime: '14:00',
        participantCount: 0,
      };

      // Act
      const result = pipe['getDateString'](data);

      // Assert
      expect(result).toEqual('01.01.2022');
    });
  });
});
