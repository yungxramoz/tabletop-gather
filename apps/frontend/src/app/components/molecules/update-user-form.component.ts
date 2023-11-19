import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { Model } from '../../models/model.type';
import { UserDto } from '../../models/user.dto';
import { InputComponent } from '../atoms/input.component';

@Component({
  selector: 'tg-update-user-form',
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
      <nb-card-body>
        <form
          class="form"
          #updateUserForm="ngForm"
          (submit)="updateUser(updateUserForm)"
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

          <div class="tg-flex-row tg-mt-2">
            <button
              nbButton
              fullWidth
              status="primary"
              shape="semi-round"
              type="submit"
              [disabled]="updateUserForm.invalid"
            >
              Save
            </button>
            <div class="tg-m-1"></div>
            <button
              nbButton
              fullWidth
              status="danger"
              shape="semi-round"
              (click)="resetForm(updateUserForm)"
            >
              Reset
            </button>
          </div>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserFormComponent implements OnChanges {
  @Input() public user!: Model<UserDto>;
  @Output() public userUpdated: EventEmitter<Model<UserDto>> = new EventEmitter<
    Model<UserDto>
  >();

  public updateUser(form: NgForm) {
    if (!form.valid) {
      alert('Form is not valid!');
      return;
    }

    if (form.controls['password'].value !== form.controls['password2'].value) {
      alert('Passwords do not match!');
      return;
    }

    this.userUpdated.emit({
      username: form.controls['username'].value,
      firstName: form.controls['firstName'].value,
      lastName: form.controls['lastName'].value,
      email: form.controls['email'].value,
      password: form.controls['password'].value,
    });

    form.resetForm();
  }

  public resetForm(form: NgForm) {
    form.reset(this.user);
    for (const control of Object.values(form.controls)) {
      control.markAsPristine();
    }
  }

  public ngOnChanges() {
    if (this.user) {
      // this.resetForm(this.user);
    }
  }
}
