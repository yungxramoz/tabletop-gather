import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogRef,
  NbDialogService,
} from '@nebular/theme';

@Component({
  selector: 'tg-sample-dialog',
  standalone: true,
  imports: [CommonModule, NbButtonModule, NbCardModule],
  template: `
    <!-- Actual component: -->
    <nb-card>
      <nb-card-header>Dialog</nb-card-header>
      <nb-card-body class="card-body">
        <button nbButton status="primary" (click)="open(dialog)">
          Open Dialog
        </button>
      </nb-card-body>
    </nb-card>

    <!-- This template is what gets rendered in the dialog: -->
    <ng-template #dialog let-data let-ref="dialogRef">
      <nb-card>
        <nb-card-header>{{ data.title }}</nb-card-header>
        <nb-card-body>{{ data.message }}</nb-card-body>
        <nb-card-footer>
          <button
            class="tg-m-1"
            nbButton
            status="success"
            (click)="accept(ref)"
          >
            Accept
          </button>
          <button
            class="tg-m-1"
            nbButton
            status="danger"
            (click)="decline(ref)"
          >
            Decline
          </button>
          <button
            class="tg-m-1"
            nbButton
            status="control"
            (click)="ref.close()"
          >
            Close Dialog
          </button>
        </nb-card-footer>
      </nb-card>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleDialogComponent {
  public constructor(private readonly dialogService: NbDialogService) {}

  public open(dialog: TemplateRef<unknown>) {
    this.dialogService.open(dialog, {
      context: {
        title: 'Yoooo',
        message: 'This is a message',
      },
    });
  }

  public accept(dialog: NbDialogRef<unknown>) {
    console.log('Accepted');
    dialog.close();
  }

  public decline(dialog: NbDialogRef<unknown>) {
    console.log('Declined');
    dialog.close();
  }
}
