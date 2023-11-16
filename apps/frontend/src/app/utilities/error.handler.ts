import { ErrorHandler, Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  public constructor(private readonly toastService: NbToastrService) {}

  public handleError(error: unknown) {
    try {
      this.toastService.danger(
        JSON.stringify(error, null, 2),
        'Oh no! Something went really wrong!'
      );
    } catch {
      console.warn('Could not display error message');
    }
    console.error(error);
  }
}
