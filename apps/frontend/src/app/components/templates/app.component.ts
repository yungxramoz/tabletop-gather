import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbLayoutModule,
  NbSidebarModule,
} from '@nebular/theme';
import { UserManagementComponent } from '../pages/user-management.component';
import { SampleDesignComponent } from '../pages/sample-design.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    JsonPipe,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    UserManagementComponent,
    SampleDesignComponent,
  ],
  selector: 'tabletop-gather-root',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <h1>tabletop gather</h1>
      </nb-layout-header>
      <nb-sidebar>Sidebar Content</nb-sidebar>
      <nb-layout-column>
        <tabletop-gather-sample-design></tabletop-gather-sample-design>
        <tabletop-gather-user-management></tabletop-gather-user-management>
        <router-outlet></router-outlet>
        Page Content <button nbButton>Hello World</button>
      </nb-layout-column>
    </nb-layout>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'frontend';
}
