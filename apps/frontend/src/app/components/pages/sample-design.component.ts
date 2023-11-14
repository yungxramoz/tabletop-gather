import { SampleButtonsComponent } from './../molecules/sample-buttons.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SampleTypographyComponent } from '../molecules/sample-typography.component';

@Component({
  selector: 'tabletop-gather-sample-design',
  standalone: true,
  imports: [CommonModule, SampleButtonsComponent, SampleTypographyComponent],
  template: `
  <div>
    <tabletop-gather-sample-buttons></tabletop-gather-sample-buttons>
    <tabletop-gather-sample-typography></tabletop-gather-sample-typography>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleDesignComponent {
}
