// This will handle these todos:
// TODO: Add loading indicator for HttpResponse
// TODO: Add success indicator for HttpResponse
// Rethink the use of loadingWrapper...

import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { Observable, catchError, of, pipe, tap, throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { friendlyErrorReponse } from '../resources/error-responses.resources';

type ErrorResponseHandlingConfig = {
  additionalError?: {
    title: string;
    message: string;
  };
  propagateError?: true;
};

const DEFAULT_CONFIG: ErrorResponseHandlingConfig = {};

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

  public handleErrorResponse = <T>(
    config: ErrorResponseHandlingConfig = {} as ErrorResponseHandlingConfig
  ): ((
    source$: Observable<HttpResponse<T>>
  ) => Observable<HttpResponse<T> | null>) => {
    const thisConfig = { ...DEFAULT_CONFIG, ...config };
    return pipe(
      catchError((error: HttpErrorResponse) => {
        const friendly = friendlyErrorReponse(error);
        const title = friendly.title;
        const message = friendly.message ?? error.message;
        this.toastService.danger(message, title);

        if (thisConfig.additionalError) {
          this.toastService.danger(
            thisConfig.additionalError.message,
            thisConfig.additionalError.title
          );
        }

        if (thisConfig.propagateError) {
          return throwError(() => new Error(error.message));
        }

        return of(null);
      })
    );
  };

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
