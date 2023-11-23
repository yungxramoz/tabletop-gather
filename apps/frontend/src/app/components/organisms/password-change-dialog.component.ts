import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme';
import { PasswordValidatorDirective } from '../../directives/password-validator.directive';
import { InputComponent } from '../atoms/input.component';
import { ValidationErrorsComponent } from '../atoms/validation-errors.component';

export type PasswordChangeDialogResult = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

@Component({
  standalone: true,
  selector: 'tg-password-change-dialog',
  imports: [
    FormsModule,
    NbCardModule,
    NbButtonModule,
    InputComponent,
    PasswordValidatorDirective,
    ValidationErrorsComponent,
  ],
  template: `
    <nb-card>
      <nb-card-header>Change password</nb-card-header>
      <nb-card-body>
        <form #changePasswordForm="ngForm" tgPasswordValidator>
          <tg-input
            ngModel
            required
            type="password"
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            placeholder=""
          ></tg-input>
          <tg-input
            ngModel
            required
            minlength="3"
            maxlength="64"
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder=""
          ></tg-input>
          <tg-input
            ngModel
            required
            minlength="3"
            maxlength="64"
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirm Password"
          ></tg-input>

          <tg-validation-errors
            [model]="changePasswordForm.form"
            [name]="'Form'"
          ></tg-validation-errors>
        </form>
      </nb-card-body>
      <nb-card-footer>
        <div class="tg-flex-row tg-justify-around">
          <button
            nbButton
            fullWidth
            ghost
            status="primary"
            shape="semi-round"
            (click)="cancel()"
          >
            Cancel
          </button>
          <div class="tg-m-1"></div>
          <button
            nbButton
            fullWidth
            status="primary"
            shape="semi-round"
            type="submit"
            [disabled]="changePasswordForm.invalid"
            (click)="confirm(changePasswordForm.value)"
          >
            Confirm
          </button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordChangeDialogComponent {
  public constructor(
    protected ref: NbDialogRef<PasswordChangeDialogComponent>
  ) {}

  public confirm(passwordObj: PasswordChangeDialogResult) {
    this.ref.close(passwordObj);
  }

  public cancel() {
    this.ref.close();
  }
}
