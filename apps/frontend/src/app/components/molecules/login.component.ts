import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { UserDto } from '../../api/model/user.dto';
import { InputComponent } from '../atoms/input.component';

export type CredentialsRetrievedEvent = {
  username: UserDto['username'];
  password: string;
};

@Component({
  selector: 'tg-login',
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
      <nb-card-header *ngIf="header">{{ header }}</nb-card-header>
      <nb-card-body>
        <form
          class="form"
          #getUserForm="ngForm"
          (submit)="getUser(getUserForm)"
        >
          <tg-input
            ngModel
            required
            id="username"
            name="username"
            label="Username"
            placeholder="johndoe"
          ></tg-input>

          <tg-input
            ngModel
            required
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="glue"
          ></tg-input>

          <div class="tg-block tg-mt-2">
            <button
              nbButton
              shape="semi-round"
              type="submit"
              [disabled]="getUserForm.invalid"
            >
              Create
            </button>
          </div>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @Input() public header: string | undefined;
  @Output()
  public credentialsRetrieved: EventEmitter<CredentialsRetrievedEvent> =
    new EventEmitter<CredentialsRetrievedEvent>();

  public getUser(form: NgForm) {
    if (!form.valid) {
      alert('Form is not valid!');
      return;
    }

    this.credentialsRetrieved.emit({
      username: form.controls['username'].value,
      password: form.controls['password'].value,
    });

    form.resetForm();
  }
}
