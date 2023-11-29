import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CollectionActionsComponent} from "../molecules/collection-actions.component";

@Component({
  standalone: true,
  selector: 'tg-collection',
  imports: [CollectionActionsComponent],
  template: `
    <tg-collection-actions></tg-collection-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {}
