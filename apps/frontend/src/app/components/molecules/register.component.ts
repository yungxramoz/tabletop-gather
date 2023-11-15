import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { InputComponent } from '../atoms/input.component';
import { RegisterUserDto } from '../../api/model/register-user.dto';
import { Model } from '../../api/model/model.type';

@Component({
  selector: 'tg-register',
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
  ],
  template: `
    <nb-card>
      <nb-card-header *ngIf="header">{{ header }}</nb-card-header>
      <nb-card-body>
        <form
          class="form"
          #createUserForm="ngForm"
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
            placeholder="********"
          ></tg-input>

          <tg-input
            ngModel
            required
            minlength="3"
            maxlength="64"
            type="password"
            id="password2"
            name="password2"
            label="Repeat Password"
            placeholder="********"
          ></tg-input>

          <div class="tg-block tg-mt-2">
            <button
              nbButton
              fullWidth
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
export class RegisterComponent {
  @Input() public header: string | undefined;
  @Output() public userCreated: EventEmitter<Model<RegisterUserDto>> =
    new EventEmitter<Model<RegisterUserDto>>();

  public createUser(form: NgForm) {
    if (!form.valid) {
      alert('Form is not valid!');
      return;
    }

    if (form.controls['password'].value !== form.controls['password2'].value) {
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
}
