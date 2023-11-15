import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  public handleError(error: unknown) {
    // TODO: Show error with nb-alert
    alert('An error occurred! Please check the console for more details.');
    console.error(error);
  }
}
