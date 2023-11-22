import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

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
  public validate(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');

    if (password?.value !== passwordConfirmation?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
