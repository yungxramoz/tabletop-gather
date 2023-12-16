import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

/**
 * Validates that `password` and `passwordConfirmation` form controls have the same value.
 * @example
 * <form tgPasswordValidator>
 *  <input type="password" name="password" />
 * <input type="password" name="passwordConfirmation" />
 * </form>
 */
@Directive({
  standalone: true,
  selector: 'form[tgPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  /** @inheritdoc */
  public validate(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');

    if (password?.value !== passwordConfirmation?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
