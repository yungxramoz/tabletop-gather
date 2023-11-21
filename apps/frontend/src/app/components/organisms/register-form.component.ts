import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { PasswordValidatorDirective } from '../../directives/password-validator.directive';
import { Model } from '../../models/model.type';
import { RegisterUserDto } from '../../models/register-user.dto';
import { InputComponent } from '../atoms/input.component';
import { ValidationErrorsComponent } from '../atoms/validation-errors.component';

@Component({
  selector: 'tg-register-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    InputComponent,
    PasswordValidatorDirective,
    ValidationErrorsComponent,
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <form
          #createUserForm="ngForm"
          tgPasswordValidator
          (submit)="createUser(createUserForm)"
        >
          <tg-input
            ngModel
            required
            minlength="3"
            maxlength="50"
            pattern="^[a-z0-9.]*$"
            id="username"
            name="username"
            label="Username"
            placeholder="johndoe"
          ></tg-input>

          <tg-input
            ngModel
            required
            minlength="3"
            maxlength="255"
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="John"
          ></tg-input>

          <tg-input
            ngModel
            required
            minlength="3"
            maxlength="255"
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Doe"
          ></tg-input>

          <tg-input
            ngModel
            required
            email
            minlength="3"
            maxlength="320"
            id="email"
            name="email"
            label="Email"
            placeholder="john@doe.com"
          ></tg-input>

          <tg-input
            ngModel
            required
            minlength="3"
            maxlength="64"
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder=""
          ></tg-input>

          <tg-input
            ngModel
            required
            minlength="3"
            maxlength="64"
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirm Password"
            placeholder=""
          ></tg-input>

          <tg-validation-errors
            [model]="createUserForm.form"
            [name]="'Form'"
          ></tg-validation-errors>

          <div class="tg-block tg-mt-2">
            <button
              nbButton
              fullWidth
              status="primary"
              shape="semi-round"
              type="submit"
              [disabled]="createUserForm.invalid"
            >
              Signup
            </button>
          </div>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Output() public userCreated: EventEmitter<Model<RegisterUserDto>> =
    new EventEmitter<Model<RegisterUserDto>>();

  public createUser(ngForm: NgForm) {
    if (
      ngForm.controls['password'].value !==
      ngForm.controls['passwordConfirmation'].value
    ) {
      alert('Passwords do not match!');
      return;
    }

    this.userCreated.emit({
      username: ngForm.controls['username'].value,
      firstName: ngForm.controls['firstName'].value,
      lastName: ngForm.controls['lastName'].value,
      email: ngForm.controls['email'].value,
      password: ngForm.controls['password'].value,
    });

    ngForm.resetForm();
  }
}
