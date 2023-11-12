import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { UsersService } from '../../api/services/users.service';

@Component({
  selector: 'tabletop-gather-create-user',
  standalone: true,
  imports: [CommonModule, AsyncPipe, JsonPipe, FormsModule],
  template: ` <div>
    <h2>Create User</h2>
    <input
      type="text"
      name="username"
      [(ngModel)]="username"
      placeholder="Username"
    />
    <input
      type="text"
      name="firstName"
      [(ngModel)]="firstName"
      placeholder="First Name"
    />
    <input
      type="text"
      name="lastName"
      [(ngModel)]="lastName"
      placeholder="Last Name"
    />
    <input
      type="number"
      name="sessionUser"
      [(ngModel)]="sessionUser"
      placeholder="Session User"
    />
    <input
      type="passwordHash"
      name="passwordHash"
      [(ngModel)]="passwordHash"
      placeholder="PasswordHash"
    />
    <input
      type="passwordSalt"
      name="passwordSalt"
      [(ngModel)]="passwordSalt"
      placeholder="PasswordSalt"
    />
    <button (click)="createUser()">Create User</button>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent {
  username = '';
  firstName = '';
  lastName = '';
  sessionUser = 0;
  passwordHash = '';
  passwordSalt = '';

  constructor(private readonly usersService: UsersService) {}

  createUser() {
    this.usersService
      .createUser({
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        sessionUser: this.sessionUser,
        passwordHash: this.passwordHash,
        passwordSalt: this.passwordSalt,
      })
      .pipe(tap((response) => alert(response)))
      .subscribe();
  }
}
