import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme';
import { InputComponent } from '../atoms/input.component';

export type DeleteDialogResult = {
  delete: boolean;
};

@Component({
  standalone: true,
  selector: 'tg-delete-dialog',
  imports: [FormsModule, NbCardModule, NbButtonModule, InputComponent],
  template: `
    <nb-card>
      <nb-card-header
        >Do you really want to delete this profile?</nb-card-header
      >
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
            No
          </button>
          <div class="tg-m-1"></div>
          <button
            nbButton
            fullWidth
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
  public constructor(protected ref: NbDialogRef<DeleteDialogComponent>) {}

  public confirm() {
    this.ref.close({ delete: true });
  }

  public cancel() {
    this.ref.close({ delete: false });
  }
}
