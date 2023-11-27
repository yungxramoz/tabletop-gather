import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { aOrAn } from './language.utility';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // See https://github.com/scttcper/ngx-toastr/issues/327
  // See https://github.com/scttcper/ngx-toastr/issues/997
  // See https://github.com/scttcper/ngx-toastr/issues/179#issuecomment-325724269
  private get toastService(): NbToastrService {
    return this.injector.get(NbToastrService);
  }

  public constructor(private readonly injector: Injector) {}

  public handleError(error: unknown) {
    // TODO: See if the circular dependency issue is fixed
    try {
      const { message, title } = this.interpretError(error);
      this.toastService.danger(message, title);
    } catch (error) {
      console.error('Error while handling error 🫠');
    }

    console.error(error);
  }

  private interpretError(error: unknown): { message: string; title: string } {
    if (error instanceof Error) {
      return {
        message: error.message,
        title: `Whoops, something threw ${aOrAn(error.name)}`,
      };
    }

    if (typeof error === 'string') {
      return {
        message: error,
        title: 'Oh no! Something went really wrong!',
      };
    }

    return {
      message: JSON.stringify(error, null, 2),
      title: 'Oh no! Something went really wrong!',
    };
  }
}
