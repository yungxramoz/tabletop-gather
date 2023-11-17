import { HttpErrorResponse } from '@angular/common/http';
import { Digit } from '../utils/types';

export type ToastErrorMessage = {
  title: string;
  message: string;
};

export type ApiException = `${string}Exception`;
export type HttpErrorStatus = `${4 | 5}${Digit}${Digit}`;

export type ApiExceptionToastMessageMap = Record<
  ApiException,
  ToastErrorMessage
>;
export type HttpErrorStatusToastMessageMap = Partial<
  Record<HttpErrorStatus, ToastErrorMessage>
>;

export const DEFAULT_API_EXCEPTION_MESSAGES: ApiExceptionToastMessageMap = {
  NotFoundException: {
    title: "We couldn't find what you were looking for in our database",
    message: 'Seems like the resource you are looking for does not exist',
  },
  DataIntegrityViolationException: {
    title: 'That already exists',
    message: 'Seems like that already exists in our database',
  },
  MethodArgumentNotValidException: {
    title: 'Some fields are invalid',
    message: 'Seems like some of the fields you provided are invalid',
  },
  BadCredentialsException: {
    title: 'Invalid credentials',
    message: 'Seems like the credentials you provided are invalid',
  },
  ResponseStatusException: {
    title: "We couldn't process your request",
    message: 'Seems like something is wrong with your request',
  },
};

export const DEFAULT_HTTP_ERROR_STATUS_MESSAGES: HttpErrorStatusToastMessageMap =
  {
    '400': {
      title: "We couldn't process your request",
      message: 'Seems like something is wrong with your request [400]',
    },
    '401': {
      title: 'You are not authenticated',
      message: 'Please login to continue [401]',
    },
    '403': {
      title: "That's forbidden",
      message: 'You require additional permissions to do that [403]',
    },
    '404': {
      title: "We couldn't find what you were looking for",
      message:
        'Seems like the resource you are looking for does not exist [404]',
    },
    '405': {
      title: 'Method not allowed',
      message: 'The http method you are using is not allowed [405]',
    },
    '409': {
      title: "There's a conflict",
      message: 'Seems like there is a conflict with your request [409]',
    },
    '500': {
      title: 'The server encountered an error',
      message: 'Seems like something went wrong on our end [500]',
    },
  };

export const friendlyErrorReponse = (
  errorResponse: HttpErrorResponse,
  overrideApiError?: ApiExceptionToastMessageMap,
  overrideHttpErrorResponse?: HttpErrorStatusToastMessageMap
): ToastErrorMessage =>
  overrideApiError?.[errorResponse.error.exception as ApiException] ??
  DEFAULT_API_EXCEPTION_MESSAGES[
    errorResponse.error.exception as ApiException
  ] ??
  overrideHttpErrorResponse?.[
    errorResponse.status.toString() as HttpErrorStatus
  ] ??
  DEFAULT_HTTP_ERROR_STATUS_MESSAGES[
    errorResponse.status.toString() as HttpErrorStatus
  ] ?? {
    title: 'Unknown Error Response',
    message: `No friendly error response found for ${errorResponse.status}, ${
      errorResponse.statusText
    }, ${JSON.stringify(errorResponse.error)}`,
  };
