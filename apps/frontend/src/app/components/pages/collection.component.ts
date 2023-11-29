import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CollectionActionsComponent} from "../molecules/collection-actions.component";
import {ViewCollectionOwnComponent} from "../organisms/view-collection-own.component";

@Component({
  standalone: true,
  selector: 'tg-collection',
  imports: [CollectionActionsComponent, ViewCollectionOwnComponent],
  template: `
    <ng-container>
      <tg-collection-actions></tg-collection-actions>
      <tg-view-collection-own></tg-view-collection-own>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {}
