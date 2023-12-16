import { ValidationErrors } from '@angular/forms';

/**
 * The default validation error messages.
 *
 * @template K - The type of error key
 * @template U - The type of error value
 * @param {K} error - The error key
 * @param {U} errorValue - The error value
 * @param {string} fieldName - The name of the field
 * @returns {string | undefined} The error message
 */
export const DEFAULT_VALIDATION_ERROR_MESSAGES = <
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
      passwordMismatch: `Passwords do not match`,
    } as Record<K, string>
  )[error];
};
