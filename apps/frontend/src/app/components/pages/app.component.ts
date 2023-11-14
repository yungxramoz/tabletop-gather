import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbLayoutModule } from '@nebular/theme';
import { UserManagementComponent } from '../organisms/user-management.component';

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe, NbLayoutModule, UserManagementComponent],
  selector: 'tg-root',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <img
          title="Tabletop Gather Logo"
          src="assets/tg-wizard-no-bg.svg"
          width="50"
          height="50"
          class="tg-m-1"
        />
        <h1 class="tg-m-1">tabletop gather</h1>
      </nb-layout-header>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title = 'Tabletop Gather';
}
