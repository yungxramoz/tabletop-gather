import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'tg-four-oh-four',
  template: `
    <div class="tg-404 tg-flex-col tg-justify-around">
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FourOhFourComponent {}
