import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
import { ROUTE_ADD_TO_COLLECTION } from '../../constants';
import { SearchInputComponent } from '../atoms/search-input.component';
import { AutocompleteComponent } from './autocomplete.component';

@Component({
  standalone: true,
  selector: 'tg-collection-actions',
  imports: [
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbActionsModule,
    RouterLink,
    AutocompleteComponent,
    SearchInputComponent,
  ],
  template: `
    <nb-actions size="medium" class="tg-flex-row tg-mb-4">
      <nb-action class="tg-grow tg-p-0">
        <tg-search-input
          class="tg-full-width"
          ngModel
          id="search"
          name="search"
          icon="search"
          placeholder="Search your collection"
          (searchInput)="handleSearchInput($event)"
        ></tg-search-input>
      </nb-action>
      <nb-action class="tg-grow-0 tg-pr-0">
        <button
          nbButton
          outline
          shape="semi-round"
          size="medium"
          status="primary"
          [routerLink]="routeAddToCollection"
        >
          <nb-icon icon="plus" status="primary" pack="eva"></nb-icon>
        </button>
      </nb-action>
    </nb-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionActionsComponent {
  @Output() private searchTerm = new EventEmitter<string>();

  public readonly routeAddToCollection = `/${ROUTE_ADD_TO_COLLECTION}`;

  public handleSearchInput(searchInput: string) {
    this.searchTerm.emit(searchInput);
  }
}
