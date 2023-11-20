import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SampleDialogComponent } from '../molecules/sample-dialog.component';
import { SampleTypographyComponent } from '../molecules/sample-typography.component';
import { SampleButtonsComponent } from './../molecules/sample-buttons.component';

@Component({
  selector: 'tg-sample-design',
  standalone: true,
  imports: [
    SampleButtonsComponent,
    SampleTypographyComponent,
    SampleDialogComponent,
  ],
  template: ` <div>
    <tg-sample-buttons></tg-sample-buttons>
    <tg-sample-typography></tg-sample-typography>
    <tg-sample-dialog></tg-sample-dialog>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleDesignComponent {}
