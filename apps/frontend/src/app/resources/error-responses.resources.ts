import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../models/error.model';
import { Digit } from '../utils/types';

/**
 * The title and message of a toast error message.
 */
export type ToastErrorMessage = {
  title: string;
  message: string;
};

/**
 * The name of an api exception.
 */
export type ApiException = `${string}Exception`;

/**
 * The status of an http error.
 */
export type HttpErrorStatus = `${4 | 5}${Digit}${Digit}`;

/**
 * The map of api exceptions to toast error messages.
 */
export type ApiExceptionToastMessageMap = Record<
  ApiException,
  ToastErrorMessage
>;

/**
 * The map of http error statuses to toast error messages.
 */
export type HttpErrorStatusToastMessageMap = Partial<
  Record<HttpErrorStatus, ToastErrorMessage>
>;

/**
 * The default map of api exceptions to **friendly** toast error messages.
 */
export const DEFAULT_API_EXCEPTION_MESSAGES: ApiExceptionToastMessageMap = {
  NotFoundException: {
    title: "We couldn't find what you were looking for in our database",
    message:
      'Seems like the resource you are looking for does not exist (NotFoundException)',
  },
  DataIntegrityViolationException: {
    title: 'That already exists',
    message:
      'Seems like that already exists in our database (DataIntegrityViolationException)',
  },
  MethodArgumentNotValidException: {
    title: 'Some fields are invalid',
    message:
      'Seems like some of the fields you provided are invalid (MethodArgumentNotValidException)',
  },
  BadCredentialsException: {
    title: 'Invalid credentials',
    message:
      'Seems like the credentials you provided are invalid (BadCredentialsException)',
  },
  ResponseStatusException: {
    title: "We couldn't process your request",
    message:
      'Seems like something is wrong with your request (ResponseStatusException)',
  },
  NullPointerException: {
    title: 'Pointer points into the abyss',
    message:
      'Seems like something went wrong on our end (NullPointerException)',
  },
};

/**
 * The default map of http error statuses to **friendly** toast error messages.
 */
export const DEFAULT_HTTP_ERROR_STATUS_MESSAGES: HttpErrorStatusToastMessageMap =
  {
    '400': {
      title: "We couldn't process your request",
      message: 'Seems like something is wrong with your request (400)',
    },
    '401': {
      title: 'You are not authenticated',
      message: 'Please login to continue (401)',
    },
    '403': {
      title: "That's forbidden",
      message:
        'You require additional permissions to do that (403). Maybe your session expired, try logging out and back in again',
    },
    '404': {
      title: "We couldn't find what you were looking for",
      message:
        'Seems like the resource you are looking for does not exist (404)',
    },
    '405': {
      title: 'Method not allowed',
      message: 'The http method you are using is not allowed (405)',
    },
    '409': {
      title: "There's a conflict",
      message: 'Seems like there is a conflict with your request (409)',
    },
    '500': {
      title: 'The server encountered an error',
      message: 'Seems like something went wrong on our end (500)',
    },
  };

/**
 * Returns a friendly error response for the given error response.
 * It will return a friendly error response for api exceptions if the error response is a {@link HttpErrorResponse} and the error response is a {@link ErrorResponse}.
 * Otherwise, it will return a sensible default error. You can override these messages by passing in a map of api exceptions to toast error messages and/or a map of http error statuses to toast error messages.
 *
 * @param {HttpErrorResponse} errorResponse - The error response from the server
 * @param {ApiExceptionToastMessageMap} overrideApiError - The map of api exceptions to toast error messages to override the default map. {@link DEFAULT_API_EXCEPTION_MESSAGES}
 * @param {HttpErrorStatusToastMessageMap} overrideHttpErrorResponse - The map of http error statuses to toast error messages to override the default map. {@link DEFAULT_HTTP_ERROR_STATUS_MESSAGES}
 * @returns {ToastErrorMessage} The friendly error response
 */
export const friendlyErrorReponse = (
  errorResponse: HttpErrorResponse,
  overrideApiError?: ApiExceptionToastMessageMap,
  overrideHttpErrorResponse?: HttpErrorStatusToastMessageMap
): ToastErrorMessage => {
  const tgError = JSON.parse(errorResponse?.error) as ErrorResponse | undefined;

  if (tgError) {
    return (
      overrideApiError?.[tgError.exception as ApiException] ??
      DEFAULT_API_EXCEPTION_MESSAGES[tgError.exception as ApiException] ?? {
        title: 'Unknown Api Error',
        message: `No friendly error response found for ${tgError.exception}, ${tgError.message}`,
      }
    );
  }

  return (
    overrideHttpErrorResponse?.[
      errorResponse.status.toString() as HttpErrorStatus
    ] ??
    DEFAULT_HTTP_ERROR_STATUS_MESSAGES[
      errorResponse.status.toString() as HttpErrorStatus
    ] ?? {
      title: 'Unknown Error Response',
      message: `No friendly error response found for ${errorResponse.status}, ${
        errorResponse.statusText
      }, ${JSON.stringify(tgError)}`,
    }
  );
};
