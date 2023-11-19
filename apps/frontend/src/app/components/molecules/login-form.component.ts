import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { LoginUserDto } from '../../models/login-user.dto';
import { Model } from '../../models/model.type';
import { InputComponent } from '../atoms/input.component';

@Component({
  selector: 'tg-login-form',
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
      <nb-card-body>
        <form
          class="form"
          #getUserForm="ngForm"
          (submit)="getUser(getUserForm)"
        >
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
  public credentialsCreated: EventEmitter<Model<LoginUserDto>> =
    new EventEmitter<Model<LoginUserDto>>();

  public getUser(form: NgForm) {
    if (!form.valid) {
      alert('Form is not valid!');
      return;
    }

    this.credentialsCreated.emit({
      email: form.controls['email'].value,
      password: form.controls['password'].value,
    });
  }
}
