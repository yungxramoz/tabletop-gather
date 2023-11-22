import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'tg-label',
  template: `
    <div class="tg-p-1">
      <label class="label" [for]="id ? id : null">{{ label }}</label>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default, // Explicitly set to default, as we usually use OnPush
})
export class LabelComponent {
  @Input({ required: true }) public label: string | undefined;
  @Input() public id!: string;
}
