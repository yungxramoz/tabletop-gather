import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'tg-void',
  template: `
    <div class="tg-m-4 tg-flex-row tg-justify-around">
      <p class="tg-text-hint">
        <i>{{ message }}</i>
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoidComponent {
  @Input({ required: true }) public message!: string;
}
