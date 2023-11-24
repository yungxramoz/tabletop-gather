import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme';
import { InputComponent } from '../atoms/input.component';

export type DeleteDialogResult = {
  delete: boolean;
};

export type DeleteDialogData = {
  message: string;
};

@Component({
  standalone: true,
  selector: 'tg-delete-dialog',
  imports: [FormsModule, NbCardModule, NbButtonModule, InputComponent],
  template: `
    <nb-card>
      <nb-card-header>{{ message }}</nb-card-header>
      <nb-card-footer>
        <div class="tg-flex-row tg-justify-end">
          <button
            nbButton
            ghost
            status="primary"
            shape="semi-round"
            (click)="cancel()"
          >
            No
          </button>
          <div class="tg-m-1"></div>
          <button
            nbButton
            status="danger"
            shape="semi-round"
            type="submit"
            (click)="confirm()"
          >
            Yes
          </button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  public readonly message: string = 'Do you really want to delete this?';

  public constructor(protected ref: NbDialogRef<DeleteDialogComponent>) {}

  public confirm() {
    this.ref.close({ delete: true });
  }

  public cancel() {
    this.ref.close({ delete: false });
  }
}
