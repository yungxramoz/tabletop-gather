import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

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
      this.toastService.danger(
        JSON.stringify(error, null, 2),
        'Oh no! Something went really wrong!'
      );
    } catch (error) {
      console.error('Error while handling error 😂');
    }

    console.error(error);
  }
}
