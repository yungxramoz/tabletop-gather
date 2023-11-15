import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbSpinnerComponent,
  NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme';
import { LoginUserDto } from '../../api/model/login-user.dto';
import { Model } from '../../api/model/model.type';
import { AuthService } from '../../api/services/auth.service';
import { RegisterComponent } from '../molecules/register.component';
import { LoginComponent } from '../molecules/login.component';
import { RegisterUserDto } from '../../api/model/register-user.dto';

@Component({
  selector: 'tg-login-management',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    NbTabsetModule,
    LoginComponent,
    RegisterComponent,
  ],
  template: `
    <nb-tabset fullWidth class="tg-max-w-50">
      <nb-tab tabTitle="Login">
        <tg-login
          (credentialsCreated)="onCredentialsCreated($event)"
        ></tg-login>
      </nb-tab>
      <nb-tab tabTitle="Register">
        <tg-register (userCreated)="onUserCreated($event)"></tg-register>
      </nb-tab>
    </nb-tabset>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginManagementComponent {
  public constructor(private readonly authService: AuthService) {}

  public onCredentialsCreated(event: Model<LoginUserDto>) {
    // TODO: Add redirect to home page
    // TODO: Add loading indicator
    // TODO: Add error handling (ErrorResponse?)
    this.authService.login(event).subscribe((lol) => alert(lol));
  }

  public onUserCreated(event: Model<RegisterUserDto>) {
    console.log(event);
  }
}
