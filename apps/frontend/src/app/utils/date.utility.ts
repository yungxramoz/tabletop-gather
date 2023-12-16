/**
 * Extracts the time from a date object and returns it as a 24 hour time string
 *
 * @param {Date} date - The date to format
 * @returns {string} The 24 hour time string
 */
export const get24HourTime = (date: Date) =>
  `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

/**
 * Formats a date object to the format DD.MM.YYYY
 *
 * @param {Date} date - The date to format
 * @returns {string} The date in the format DD.MM.YYYY
 */
export const getDateCHFormat = (date: Date) =>
  `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getFullYear()}`;
