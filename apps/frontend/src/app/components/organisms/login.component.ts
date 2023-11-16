import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbTabsetModule } from '@nebular/theme';
import { LoginUserDto } from '../../api/model/login-user.dto';
import { Model } from '../../api/model/model.type';
import { RegisterUserDto } from '../../api/model/register-user.dto';
import { AuthService } from '../../auth/auth.service';
import { LoginFormComponent } from '../molecules/login-form.component';
import { RegisterFormComponent } from '../molecules/register-form.component';

@Component({
  selector: 'tg-login-management',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    NbTabsetModule,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  template: `
    <nb-tabset fullWidth class="tg-max-w-50">
      <nb-tab tabTitle="Login">
        <tg-login-form
          (credentialsCreated)="onCredentialsCreated($event)"
        ></tg-login-form>
      </nb-tab>
      <nb-tab tabTitle="Register">
        <tg-register-form
          (userCreated)="onUserCreated($event)"
        ></tg-register-form>
      </nb-tab>
    </nb-tabset>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public onCredentialsCreated(event: Model<LoginUserDto>) {
    this.authService.login(event).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  public onUserCreated(event: Model<RegisterUserDto>) {
    this.authService.signup(event).subscribe();
  }
}
