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

@Component({
  selector: 'tabletop-gather-create-user',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    JsonPipe,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
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
          <input
            ngModel
            nbInput
            required
            shape="semi-round"
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            ngModel
            nbInput
            required
            shape="semi-round"
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <input
            ngModel
            nbInput
            required
            shape="semi-round"
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          <input
            nbInput
            ngModel
            shape="semi-round"
            type="number"
            name="sessionUser"
            placeholder="Session User"
          />
          <input
            ngModel
            nbInput
            required
            shape="semi-round"
            type="passwordHash"
            name="passwordHash"
            placeholder="PasswordHash"
          />
          <input
            ngModel
            nbInput
            required
            shape="semi-round"
            type="passwordSalt"
            name="passwordSalt"
            placeholder="PasswordSalt"
          />
          <button nbButton shape="semi-round" type="submit">Create User</button>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  styles: [
    `
      .form > * {
        margin-bottom: 1rem;
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent {
  @Output()
  userCreated: EventEmitter<Model<UserDto>> = new EventEmitter<
    Model<UserDto>
  >();

  createUserForm!: NgForm;
  username = '';
  firstName = '';
  lastName = '';
  sessionUser = 0;
  passwordHash = '';
  passwordSalt = '';

  createUser(form: NgForm) {
    console.log(form);

    if (!form.valid) {
      alert('Form is not valid!');
      return;
    }

    this.userCreated.emit({
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      sessionUser: this.sessionUser,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
    });
  }
}
