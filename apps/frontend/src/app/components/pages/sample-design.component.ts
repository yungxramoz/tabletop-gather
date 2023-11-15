import { SampleButtonsComponent } from './../molecules/sample-buttons.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SampleTypographyComponent } from '../molecules/sample-typography.component';

@Component({
  selector: 'tg-sample-design',
  standalone: true,
  imports: [SampleButtonsComponent, SampleTypographyComponent],
  template: ` <div>
    <tg-sample-buttons></tg-sample-buttons>
    <tg-sample-typography></tg-sample-typography>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleDesignComponent {}
