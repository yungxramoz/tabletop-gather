import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'tg-lazy-image',
  template: `
    <img
      [src]="src"
      (error)="fallbackImage($event)"
      [width]="width"
      [height]="height"
      loading="lazy"
      fetchpriority="low"
      class="tg-img-center"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImageComponent {
  @Input({ required: true }) public src!: string;
  @Input() public width = 30;
  @Input() public height = 30;

  public fallbackImage(event: Event) {
    const image = event.target as HTMLImageElement;
    image.src = 'assets/tg-image-outline.svg';
    image.onerror = null;
  }
}
