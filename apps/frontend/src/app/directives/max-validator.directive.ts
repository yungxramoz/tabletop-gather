import { Directive, Input } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

/**
 * Validates that the input value is less than or equal to the provided value.
 * @example
 * <input type="number" tgMaxValidator="100" />
 */
@Directive({
  standalone: true,
  selector: '[type="number"][tgMaxValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MaxValidatorDirective,
      multi: true,
    },
  ],
})
export class MaxValidatorDirective implements Validator {
  @Input() public tgMaxValidator: number | undefined;

  /** @inheritdoc */
  public validate(control: FormControl): ValidationErrors | null {
    const value = +control.value;

    if (value > (this.tgMaxValidator ?? 100)) {
      return { max: { max: this.tgMaxValidator ?? 100 } };
    }

    return null;
  }
}
