import { Directive, Input } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[type="number"][tgMinValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinValidatorDirective,
      multi: true,
    },
  ],
})
export class MinValidatorDirective implements Validator {
  @Input() public tgMinValidator: number | undefined;

  public validate(control: FormControl): ValidationErrors | null {
    const value = +control.value;

    if (value < (this.tgMinValidator ?? 0)) {
      return { min: { min: this.tgMinValidator ?? 0 } };
    }

    return null;
  }
}
