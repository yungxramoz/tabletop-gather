import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NbButtonModule, NbIconModule, NbLayoutModule } from '@nebular/theme';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  ROUTE_COLLECTION,
  ROUTE_EVENTS,
  ROUTE_LOGIN,
  ROUTE_PROFILE,
} from '../constants';
import { FooterMenuComponent } from './components/molecules/footer-menu.component';
import { AuthService } from './services/auth.service';

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
    FooterMenuComponent,
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
        <h2 class="tg-m-1">tabletop gather</h2>
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
      <nb-layout-footer fixed *ngIf="showFooter$ | async">
        <tg-footer-menu></tg-footer-menu>
      </nb-layout-footer>
    </nb-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public readonly title = 'Tabletop Gather';
  public readonly loginStatus$ = this.authService.loginStatus$;
  private readonly showFooterSubject = new BehaviorSubject<boolean>(false);
  public readonly showFooter$ = this.showFooterSubject.asObservable();
  private readonly subscriptions: Subscription[] = [];

  public constructor(
    private readonly authService: AuthService,
    public readonly router: Router
  ) {}

  public logout() {
    this.authService.logout();
  }

  public ngOnInit() {
    this.subscriptions.push(
      this.authService.loginStatus$.subscribe((loginStatus) => {
        if (!loginStatus) {
          this.router.navigate(['/' + ROUTE_LOGIN]); // TODO: Shouldn't this automatically trigger if canActivate becomes false?
        }
      })
    );

    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const showFooter = [
            event.url === '/',
            event.url === '/' + ROUTE_EVENTS,
            event.url === '/' + ROUTE_COLLECTION,
            event.url === '/' + ROUTE_PROFILE,
          ].some(Boolean);
          this.showFooterSubject.next(showFooter);
        }
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
