/**
 * Model for error responses
 *
 * @property {string} exception - The name of the api exception that was thrown
 * @property {string} message - A message describing the error
 * @property {number} httpStatus - The {@link HttpErrorStatus} of the error
 * @property {FieldError[]} fieldErrors - A list of {@link FieldError}s, if the error was a validation error
 */
export type ErrorResponse = {
  exception: string;
  message: string;
  httpStatus: string;
  fieldErrors: FieldError[];
};

/**
 * Model for field errors
 *
 * @property {string} field - The name of the field that caused the error
 * @property {string} errorCode - The error code of the error
 * @property {string} message - A message describing the error
 */
export type FieldError = {
  field: string;
  errorCode: string;
  message: string;
};
