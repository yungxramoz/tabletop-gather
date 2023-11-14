import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTabsetModule } from '@nebular/theme';
import { LoginUserDto } from '../../api/model/login-user.dto';
import { Model } from '../../api/model/model.type';
import { AuthService } from '../../api/services/auth.service';
import {
  CreateUserComponent,
  UserCreatedEvent,
} from '../molecules/create-user.component';
import { LoginComponent } from '../molecules/login.component';

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
  public constructor(private readonly authService: AuthService) {}

  public onCredentialsRetrieved(event: Model<LoginUserDto>) {
    this.authService.login(event).subscribe((lol) => alert(lol));
    throw new Error('COMBAK');
    // - Fix Cors issue with normal /api/ endpoints
    // - Remove @CrossOrigin() attrs
    // - Move /api/auth to /auth. That's just nicer
    // - Add error handling (ErrorResponse?)
    // - Add loading indicator
    // - Add redirect to home page
    // - Make new "regsiter user" component
    // - Probably delete the "create user" component
  }

  public onUserCreated(event: UserCreatedEvent) {
    console.log(event);
  }
}
