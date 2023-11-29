import {ChangeDetectionStrategy, Component} from "@angular/core";
import {InputComponent} from "../atoms/input.component";
import {FormsModule} from "@angular/forms";
import {NbActionsModule, NbButtonModule, NbIconModule} from '@nebular/theme';
import {ROUTE_ADD_TO_COLLECTION} from "../../constants";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'tg-collection-actions',
  imports: [InputComponent, FormsModule, NbIconModule, NbButtonModule, NbActionsModule, RouterLink],
  template: `
    <nb-actions class="tg-flex-row">
      <nb-action class="tg-flex-grow-1">
        <tg-input
          class="tg-full-width"
          ngModel
          id="search"
          name="search"
          icon="search"
          placeholder="Search"
          [isSearch]="true"
        ></tg-input>
      </nb-action>
      <nb-action class="tg-flex-grow-0">
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
  public readonly routeAddToCollection = `/${ROUTE_ADD_TO_COLLECTION}`
}
