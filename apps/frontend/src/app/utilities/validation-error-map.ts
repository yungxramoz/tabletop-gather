import { ValidationErrors } from '@angular/forms';

export const getErrors = (
  errors: ValidationErrors,
  fieldName: string
): string[] => {
  const errorMessages: string[] = [];

  if (errors) {
    Object.keys(errors).forEach((key: string) => {
      switch (key) {
        case 'required':
          errorMessages.push(`${fieldName} is required`);
          break;
        case 'minlength':
          errorMessages.push(
            `${fieldName} must be at least ${errors[key].requiredLength} characters`
          );
          break;
        case 'maxlength':
          errorMessages.push(
            `${fieldName} must be at most ${errors[key].requiredLength} characters`
          );
          break;
        case 'email':
          errorMessages.push(`${fieldName} must be a valid email address`);
          break;
        case 'pattern':
          errorMessages.push(
            `${fieldName} must match the pattern ${errors[key].requiredPattern}`
          );
          break;
        case 'min':
          errorMessages.push(
            `${fieldName} must be at least ${errors[key].min}`
          );
          break;
        case 'max':
          errorMessages.push(`${fieldName} must be at most ${errors[key].max}`);
          break;
        default:
          errorMessages.push(`${fieldName} is invalid`);
          break;
      }
    });
  }

  return errorMessages;
};
