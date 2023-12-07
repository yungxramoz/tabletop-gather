import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {InputComponent} from "../atoms/input.component";
import {FormsModule} from "@angular/forms";
import {NbActionsModule, NbButtonModule, NbIconModule} from '@nebular/theme';
import {ROUTE_ADD_TO_COLLECTION} from "../../constants";
import {RouterLink} from "@angular/router";
import {AutocompleteComponent} from "./autocomplete.component";

@Component({
  standalone: true,
  selector: 'tg-collection-actions',
  imports: [InputComponent, FormsModule, NbIconModule, NbButtonModule, NbActionsModule, RouterLink, AutocompleteComponent],
  template: `
    <nb-actions class="tg-flex-row tg-mb-4">
      <nb-action class="tg-grow tg-p-0">
        <tg-input
          class="tg-full-width"
          ngModel
          id="search"
          name="search"
          icon="search"
          placeholder="Search"
          [isSearch]="true"
          (searchInput)="handleSearchInput($event)"
        ></tg-input>
      </nb-action>
      <nb-action class="tg-grow-0">
        <button
          nbButton
          shape="round"
          size="large"
          status="primary"
          [routerLink]="routeAddToCollection"
        >
          <nb-icon icon="plus" pack="eva"></nb-icon>
        </button>
      </nb-action>
    </nb-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionActionsComponent {
  @Output() private searchTerm = new EventEmitter<string>();

  public readonly routeAddToCollection = `/${ROUTE_ADD_TO_COLLECTION}`

  public handleSearchInput(searchInput: string) {
    this.searchTerm.emit(searchInput);
  }
}
