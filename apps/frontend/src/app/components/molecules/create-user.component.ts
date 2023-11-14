import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { Model } from '../../api/model/model.type';
import { UserDto } from '../../api/model/user.dto';
import { InputComponent } from '../atoms/input-text.component';

@Component({
  selector: 'tg-create-user',
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
      <nb-card-header>Add a new user</nb-card-header>
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
            id="username"
            name="username"
            label="Username"
            placeholder="johndoe"
          ></tg-input>

          <tg-input
            ngModel
            required
            minlength="3"
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="John"
          ></tg-input>

          <tg-input
            ngModel
            required
            minlength="3"
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Doe"
          ></tg-input>

          <tg-input
            ngModel
            type="number"
            id="sessionUser"
            name="sessionUser"
            label="Session User"
            placeholder=""
          ></tg-input>

          <tg-input
            ngModel
            required
            minlength="3"
            id="passwordHash"
            name="passwordHash"
            label="Password Hash"
            placeholder="yxu9s8s09as831w"
          ></tg-input>

          <tg-input
            ngModel
            required
            minlength="3"
            id="passwordSalt"
            name="passwordSalt"
            label="Password Salt"
            placeholder="s9s8s09as831w"
          ></tg-input>

          <div class="tg-block tg-mt-2">
            <button
              nbButton
              shape="semi-round"
              type="submit"
              [disabled]="createUserForm.invalid"
            >
              Create User
            </button>
          </div>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent {
  @Output()
  public userCreated: EventEmitter<Model<UserDto>> = new EventEmitter<
    Model<UserDto>
  >();

  public createUser(form: NgForm) {
    if (!form.valid) {
      alert('Form is not valid!');
      return;
    }

    this.userCreated.emit({
      username: form.controls['username'].value,
      firstName: form.controls['firstName'].value,
      lastName: form.controls['lastName'].value,
      sessionUser: form.controls['sessionUser'].value,
      passwordHash: form.controls['passwordHash'].value,
      passwordSalt: form.controls['passwordSalt'].value,
    });

    form.resetForm();
  }
}
