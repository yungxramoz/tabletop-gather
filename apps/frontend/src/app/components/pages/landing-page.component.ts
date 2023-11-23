import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NbButtonModule } from '@nebular/theme';
import { ROUTE_EVENTS, ROUTE_LOGIN } from '../../constants';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'tg-landing-page',
  imports: [NbButtonModule, RouterModule],
  template: `
    <div class="tg-full tg-flex-col tg-justify-center">
      <img
        title="Tabletop Gather Logo"
        src="assets/tg-wizard-no-bg.svg"
        class="tg-m-4 tg-max-w-30"
      />
      <button
        nbButton
        status="primary"
        outline
        class="tg-m-4"
        [routerLink]="routeLogin"
      >
        Enter
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  public readonly routeLogin = '/' + ROUTE_LOGIN;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.authService.loginStatus$.subscribe((loginStatus) => {
      if (loginStatus) {
        this.router.navigate(['/' + ROUTE_EVENTS]);
      }
    });
  }
}
