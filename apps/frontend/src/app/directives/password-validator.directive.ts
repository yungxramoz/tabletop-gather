import { Directive, OnInit } from '@angular/core';
import { AbstractControl, NgForm, ValidationErrors } from '@angular/forms';

@Directive({
  standalone: true,
  selector: 'form[tgPasswordValidator]',
})
export class PasswordValidatorDirective implements OnInit {
  public constructor(private readonly ngForm: NgForm) {}

  public ngOnInit() {
    this.ngForm.form.setValidators(this.validatePassword);
  }

  public validatePassword(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');

    if (password?.value !== passwordConfirmation?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
