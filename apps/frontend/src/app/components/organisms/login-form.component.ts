import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { LoginUser } from '../../models/login-user.dto';
import { InputComponent } from '../atoms/input.component';

@Component({
  selector: 'tg-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    InputComponent,
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <form #getUserForm="ngForm" (submit)="getUser(getUserForm)">
          <tg-input
            ngModel
            required
            id="email"
            name="email"
            label="Email"
            placeholder="john@doe.com"
          ></tg-input>

          <tg-input
            ngModel
            required
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder=""
          ></tg-input>

          <div class="tg-block tg-mt-2">
            <button
              nbButton
              fullWidth
              status="primary"
              shape="semi-round"
              type="submit"
              [disabled]="getUserForm.invalid"
            >
              Login
            </button>
          </div>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output()
  public credentialsCreated: EventEmitter<LoginUser> =
    new EventEmitter<LoginUser>();

  public getUser(ngForm: NgForm) {
    this.credentialsCreated.emit({
      email: ngForm.controls['email'].value,
      password: ngForm.controls['password'].value,
    });
  }
}
