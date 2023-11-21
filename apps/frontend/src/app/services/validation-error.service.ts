import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DEFAULT_VALIDATION_ERROR_MESSAGES } from '../resources/validation-errors.resources';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {
  public friendlyValidationErrors(
    errors: ValidationErrors,
    fieldName?: string
  ): string[] {
    const errorMessages: string[] = [];
    const name = fieldName ?? 'This field';

    if (errors) {
      Object.keys(errors).forEach((key: string) => {
        const msg = DEFAULT_VALIDATION_ERROR_MESSAGES(key, errors[key], name);

        if (msg) {
          errorMessages.push(msg);
        } else {
          console.error(
            `Missing validation error. Add \`${key}\` with value: \`${JSON.stringify(
              errors[key]
            )}\` to the mapping.}`
          );
          errorMessages.push(`${fieldName} is invalid`);
        }
      });
    }

    return errorMessages;
  }
}
