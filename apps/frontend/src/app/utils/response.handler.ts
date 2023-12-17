import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable, catchError, of, pipe, tap, throwError } from 'rxjs';
import {
  ApiExceptionToastMessageMap,
  HttpErrorStatusToastMessageMap,
  friendlyErrorReponse,
} from '../resources/error-responses.resources';

/**
 * A configuration object for the {@link ResponseHandler}s rxjs operators
 *
 * @property {ApiExceptionToastMessageMap} overrideApiError - A map of {@link ApiException}s to {@link ToastErrorMessage}s, overriding the {@link DEFAULT_API_EXCEPTION_MESSAGES}
 * @property {HttpErrorStatusToastMessageMap} overrideHttpErrorResponse - A map of {@link HttpErrorStatus}es to {@link ToastErrorMessage}s, overriding the {@link DEFAULT_HTTP_ERROR_STATUS_MESSAGES}
 * @property {boolean} propagateError - If true, the error will be propagated, instead of being swallowed
 */
type ErrorResponseHandlingConfig = {
  overrideApiError?: ApiExceptionToastMessageMap;
  overrideHttpErrorResponse?: HttpErrorStatusToastMessageMap;
  propagateError?: true;
};

const DEFAULT_CONFIG: ErrorResponseHandlingConfig = {};

/**
 * A service for handling responses from the server.
 * Provides a set of rxjs operators for handling responses from the server.
 */
@Injectable({
  providedIn: 'root',
})
export class ResponseHandler {
  // See https://github.com/scttcper/ngx-toastr/issues/327
  // See https://github.com/scttcper/ngx-toastr/issues/997
  // See https://github.com/scttcper/ngx-toastr/issues/179#issuecomment-325724269
  private get toastService(): NbToastrService {
    return this.injector.get(NbToastrService);
  }

  public constructor(private readonly injector: Injector) {}

  /**
   * Handles an error response from the server by showing a toast with the error.
   * It uses `catchError` to catch the error in a stream from a http request.
   * Do not use in combination with {@link handleResponse}, as it will call this method internally.
   *
   * @param {ErrorResponseHandlingConfig} config - The configuration for the error response handling
   * @returns {Observable<HttpResponse<T> | null>} An observable which will emit the response if it was successful, or null if it was not
   */
  public handleErrorResponse = <T>(
    config: ErrorResponseHandlingConfig = {} as ErrorResponseHandlingConfig
  ): ((
    source$: Observable<HttpResponse<T>>
  ) => Observable<HttpResponse<T> | null>) => {
    const thisConfig = { ...DEFAULT_CONFIG, ...config };

    return pipe(
      catchError((error: HttpErrorResponse) => {
        const { message, title } = friendlyErrorReponse(
          error,
          thisConfig.overrideApiError,
          thisConfig.overrideHttpErrorResponse
        );

        this.toastService.danger(message, title);

        if (thisConfig.propagateError) {
          return throwError(() => new Error(title + '\n' + message));
        }

        return of(null);
      })
    );
  };

  /**
   * Handles a successful response from the server by showing a toast with the success message.
   * It uses `tap` to tap into a stream from a http request.
   * You should specify an override for the success title and/or message, otherwise it will use the status text of the response.
   *
   * @param {ErrorResponseHandlingConfig & { successTitleOverride?: string; successMessageOverride?: string; }} config - The configuration for the error response handling
   * @returns {Observable<HttpResponse<T> | null>} An observable which will emit the response if it was successful, or null if it was not
   */
  public handleResponse = <T>(
    config: ErrorResponseHandlingConfig & {
      successTitleOverride?: string;
      successMessageOverride?: string;
    } = {} as ErrorResponseHandlingConfig
  ): ((
    source$: Observable<HttpResponse<T>>
  ) => Observable<HttpResponse<T> | null>) => {
    const thisConfig = { ...DEFAULT_CONFIG, ...config };

    return pipe(
      tap((response) => {
        const title = thisConfig.successTitleOverride ?? 'Success';
        const message =
          thisConfig.successMessageOverride ??
          response.statusText ??
          'The request was successful';
        this.toastService.success(message, title);
      }),
      this.handleErrorResponse(thisConfig)
    );
  };
}
