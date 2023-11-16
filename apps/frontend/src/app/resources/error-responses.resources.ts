import { HttpErrorResponse } from '@angular/common/http';

export const friendlyErrorReponse = (
  errorResponse: HttpErrorResponse
): { title: string; message: string } => {
  const apiExceptions = {
    NotFoundException: "We couldn't find what you were looking for",
    DataIntegrityViolationException: 'That already exists',
    MethodArgumentNotValidException: 'That is invalid',
    BadCredentialsException: "Those credentials don't match our records",
    ResponseStatusException: "We couldn't process your request",
  };

  const errorResponseStates = {
    400: "We couldn't process your request",
    401: 'You are not authorized to do that',
    403: 'You are not authorized to do that',
    404: "We couldn't find what you were looking for",
    409: "There's a conflict",
    500: 'The server encountered an error',
  };

  return {
    title:
      errorResponseStates[
        errorResponse.status as keyof typeof errorResponseStates
      ] ?? 'Unknown Http Status',
    message:
      (apiExceptions[
        errorResponse.error?.exception as keyof typeof apiExceptions
      ] ?? 'Unknown Api Error') +
      ` (${
        errorResponse.error?.exception ?? 'No exception Name'
      }, HttpStatus: ${errorResponse.status})`,
  };
};
