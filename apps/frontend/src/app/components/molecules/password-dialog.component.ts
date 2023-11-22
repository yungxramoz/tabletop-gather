import { Component } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme';
import { InputComponent } from '../atoms/input.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'tg-password-dialog',
  imports: [FormsModule, NbCardModule, NbButtonModule, InputComponent],
  template: `
    <nb-card>
      <nb-card-header>This action requires your password</nb-card-header>
      <nb-card-body>
        <form #passwordForm="ngForm">
          <tg-input
            ngModel
            required
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder=""
          ></tg-input>
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
            [disabled]="passwordForm.invalid"
            (click)="confirm(passwordForm.controls['password'].value)"
          >
            Confirm
          </button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordDialogComponent {
  public constructor(protected ref: NbDialogRef<PasswordDialogComponent>) {}

  public confirm(password: string) {
    this.ref.close({ password });
  }

  public cancel() {
    this.ref.close();
  }
}
