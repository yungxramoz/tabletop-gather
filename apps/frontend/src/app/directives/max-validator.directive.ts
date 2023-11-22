import { Directive, Input } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

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

  public validate(control: FormControl): ValidationErrors | null {
    const value = +control.value;

    if (value > (this.tgMaxValidator ?? 100)) {
      return { max: { max: this.tgMaxValidator ?? 100 } };
    }

    return null;
  }
}
