import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import {InputComponent} from "../atoms/input.component";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'tg-collection',
  imports: [NbCardModule, InputComponent, FormsModule],
  template: `
    <nb-card>
      <tg-input
        ngModel
        id="search"
        name="search"
        icon="search"
        placeholder="Search"
        [isSearch]="true"
      ></tg-input>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {}
