import { ValidationErrors } from '@angular/forms';

export const friendlyValidationErrors = (
  errors: ValidationErrors,
  fieldName: string
): string[] => {
  const errorMessages: string[] = [];

  const validationErrorMapping = <
    K extends keyof ValidationErrors,
    U extends ValidationErrors[K]
  >(
    error: K,
    errorValue: U,
    fieldName: string
  ): string | undefined => {
    return (
      {
        required: `${fieldName} is required`,
        minlength: `${fieldName} must be at least ${errorValue.requiredLength} characters`,
        maxlength: `${fieldName} must be at most ${errorValue.requiredLength} characters`,
        email: `${fieldName} must be a valid email address`,
        pattern: `${fieldName} must match the pattern ${errorValue.requiredPattern}`,
        min: `${fieldName} must be at least ${errorValue.min}`,
        max: `${fieldName} must be at most ${errorValue.max}`,
      } as Record<K, string>
    )[error];
  };

  if (errors) {
    Object.keys(errors).forEach((key: string) => {
      const msg = validationErrorMapping(key, errors[key], fieldName);

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
};
