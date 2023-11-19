import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

@Component({
  standalone: true,
  selector: 'tg-collection',
  imports: [NbCardModule],
  template: `
    <nb-card>
      <nb-card-header>Collection</nb-card-header>
      <nb-card-body>
        <p>Welcome to the collection!</p>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {}
