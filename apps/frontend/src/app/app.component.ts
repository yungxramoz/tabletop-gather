import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NbButtonModule, NbIconModule, NbLayoutModule } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
import { FooterMenuComponent } from './components/molecules/footer-menu.component';
import { ROUTE_COLLECTION, ROUTE_EVENTS, ROUTE_PROFILE } from './constants';
import { AuthService } from './services/auth.service';
import {NavigationService} from "./services/navigation.service";

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
      <nb-layout-header fixed *ngIf="loginStatus$ | async">
        <img
          title="Home"
          src="assets/tg-wizard-no-bg.svg"
          width="50"
          height="50"
          class="tg-m-1 tg-clickable"
          [routerLink]="['/']"
        />
        <div class="tg-grow"></div>
        <button nbButton ghost size="large" status="primary" (click)="logout()">
          <nb-icon icon="log-out-outline"></nb-icon>
        </button>
      </nb-layout-header>
      <nb-layout-column class="tg-max-w-70 tg-mx-auto">
        <button
          nbButton
          ghost
          size="large"
          status="primary"
          *ngIf="navigationService.showBackButton()"
          (click)="navigationService.back()"
        >
          <nb-icon icon="arrow-back-outline"></nb-icon>
        </button>
        <router-outlet></router-outlet>
      </nb-layout-column>
      <nb-layout-footer fixed class="tg-sticky" *ngIf="showFooter$ | async">
        <tg-footer-menu></tg-footer-menu>
      </nb-layout-footer>
    </nb-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public readonly title = 'Tabletop Gather';
  public readonly loginStatus$ = this.authService.loginStatus$;
  private readonly showFooterSubject = new BehaviorSubject<boolean>(false);
  public readonly showFooter$ = this.showFooterSubject.asObservable();

  public constructor(
    private readonly authService: AuthService,
    public readonly navigationService: NavigationService,
    public readonly router: Router
  ) {}

  public logout() {
    this.authService.logout();
  }

  public ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const showFooter = [
          event.url === '/' + ROUTE_EVENTS,
          event.url === '/' + ROUTE_COLLECTION,
          event.url === '/' + ROUTE_PROFILE,
        ].some(Boolean);
        this.showFooterSubject.next(showFooter);
      }
    });
  }
}
