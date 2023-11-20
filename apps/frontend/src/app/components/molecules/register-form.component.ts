import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm, ValidationErrors } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { PasswordValidatorDirective } from '../../directives/password-validator.directive';
import { Model } from '../../models/model.type';
import { RegisterUserDto } from '../../models/register-user.dto';
import { friendlyValidationErrors } from '../../resources/validation-errors.resources';
import { InputComponent } from '../atoms/input.component';

@Component({
  selector: 'tg-register-form',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    JsonPipe,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    InputComponent,
    PasswordValidatorDirective,
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <form
          class="form"
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

          <div
            class="tg-p-1"
            *ngIf="!createUserForm.pristine && createUserForm.errors"
          >
            <p
              class="text-danger"
              *ngFor="let error of getErrors(createUserForm.errors)"
            >
              {{ error }}
            </p>
          </div>

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

  public createUser(form: NgForm) {
    if (
      form.controls['password'].value !==
      form.controls['passwordConfirmation'].value
    ) {
      alert('Passwords do not match!');
      return;
    }

    this.userCreated.emit({
      username: form.controls['username'].value,
      firstName: form.controls['firstName'].value,
      lastName: form.controls['lastName'].value,
      email: form.controls['email'].value,
      password: form.controls['password'].value,
    });

    form.resetForm();
  }

  public getErrors(errors: ValidationErrors) {
    return friendlyValidationErrors(errors, 'Form');
  }
}
