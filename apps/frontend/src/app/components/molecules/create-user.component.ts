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
            #username="ngModel"
            required
            minlength="3"
            name="username"
            placeholder="Username"
            label="Username"
            id="username"
          ></tg-input>

          <tg-input
            ngModel
            #firstName="ngModel"
            required
            minlength="3"
            name="firstName"
            placeholder="First Name"
            label="First Name"
            id="firstName"
          ></tg-input>

          <tg-input
            ngModel
            #lastName="ngModel"
            required
            minlength="3"
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            id="lastName"
          ></tg-input>

          <tg-input
            ngModel
            #sessionUser="ngModel"
            type="number"
            name="sessionUser"
            placeholder="Session User"
            label="Session User"
            id="sessionUser"
          ></tg-input>

          <tg-input
            ngModel
            #passwordHash="ngModel"
            required
            minlength="3"
            name="passwordHash"
            placeholder="PasswordHash"
            label="Password Hash"
            id="passwordHash"
          ></tg-input>

          <tg-input
            ngModel
            #passwordSalt="ngModel"
            required
            minlength="3"
            name="passwordSalt"
            placeholder="PasswordSalt"
            label="Password Salt"
            id="passwordSalt"
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

  public username = '';
  public firstName = '';
  public lastName = '';
  public sessionUser = 0;
  public passwordHash = '';
  public passwordSalt = '';

  public createUser(form: NgForm) {
    throw new Error('Not workign anymore!');
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
