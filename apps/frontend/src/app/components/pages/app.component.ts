import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NbButtonModule, NbIconModule, NbLayoutModule } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterModule,
    JsonPipe,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
  ],
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
        <div class="tg-flex-grow"></div>
        <button
          *ngIf="loginStatus$ | async"
          nbButton
          status="control"
          (click)="logout()"
        >
          <nb-icon icon="log-out-outline"></nb-icon>
        </button>
      </nb-layout-header>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly title = 'Tabletop Gather';

  public readonly loginStatus$ = this.authService.loginStatus$;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.authService.loginStatus$.subscribe((loginStatus) => {
      if (!loginStatus) {
        this.router.navigate(['/login']); // TODO: Shouldn't this automatically trigger if canActivate becomes false?
      }
    });
  }
  public logout() {
    this.authService.logout();
  }
}
