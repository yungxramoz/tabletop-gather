import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbTabsetModule } from '@nebular/theme';
import { ROUTE_EVENTS } from '../../constants';
import { LoginUser } from '../../models/login-user.dto';
import { RegisterUser } from '../../models/register-user.dto';
import { AuthService } from '../../services/auth.service';
import { LoginFormComponent } from '../organisms/login-form.component';
import { RegisterFormComponent } from '../organisms/register-form.component';

@Component({
  selector: 'tg-login',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    NbTabsetModule,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  template: `
    <div class="tg-flex-col tg-justify-around">
      <img
        title="Tabletop Gather Logo"
        src="assets/tg-wizard-no-bg.svg"
        width="120"
        height="120"
        class="tg-m-4"
      />
      <nb-tabset fullWidth class="tg-max-w-50 tg-full">
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
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public onCredentialsCreated(event: LoginUser) {
    // Unsubscribe, since this uses shareReplay()
    const subscription = this.authService.login(event).subscribe(() => {
      this.router.navigate(['/' + ROUTE_EVENTS]);
      subscription.unsubscribe();
    });
  }

  public onUserCreated(event: RegisterUser) {
    this.authService.signup(event).subscribe();
  }
}
