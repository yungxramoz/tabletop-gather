import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTabsetModule } from '@nebular/theme';
import {
  CreateUserComponent,
  UserCreatedEvent,
} from '../molecules/create-user.component';
import {
  LoginComponent,
  CredentialsRetrievedEvent,
} from '../molecules/login.component';

@Component({
  selector: 'tg-login-management',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    NbTabsetModule,
    LoginComponent,
    CreateUserComponent,
  ],
  template: `
    <nb-tabset fullWidth class="tg-max-w-50">
      <nb-tab tabTitle="Login">
        <tg-login
          (credentialsRetrieved)="onCredentialsRetrieved($event)"
        ></tg-login>
      </nb-tab>
      <nb-tab tabTitle="Register">
        <tg-create-user (userCreated)="onUserCreated($event)"></tg-create-user>
      </nb-tab>
    </nb-tabset>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginManagementComponent {
  public onCredentialsRetrieved(event: CredentialsRetrievedEvent) {
    console.log(event);
  }

  public onUserCreated(event: UserCreatedEvent) {
    console.log(event);
  }
}
