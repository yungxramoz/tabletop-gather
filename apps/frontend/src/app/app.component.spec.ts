import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { lastValueFrom, of } from 'rxjs';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { ROUTE_COLLECTION, ROUTE_EVENTS, ROUTE_PROFILE } from './constants';
import { AuthService } from './services/auth.service';

describe(AppComponent.name, () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule.withRoutes([
          {
            path: '',
            pathMatch: 'full',
            component: AppComponent,
          },
        ]),
      ],
      providers: [
        ...appConfig.providers,
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should render an icon', () => {
    // Arrange & Act
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Assert
    expect(compiled.querySelector('img')?.src).toContain('tg-wizard-no-bg.svg');
  });

  it(`should have correct tab title`, () => {
    // Arrange & Act
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Assert
    expect(app.title).toEqual('Tabletop Gather');
  });

  it(`should show the menu footer only on ${ROUTE_EVENTS}, ${ROUTE_COLLECTION} and ${ROUTE_PROFILE}`, async () => {
    // Arrange & Act
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const routes = router.config
      .map((route) => route.path)
      .filter((route) => route !== undefined) as string[];
    const routesWithFooter = [ROUTE_EVENTS, ROUTE_COLLECTION, ROUTE_PROFILE];

    // Assert
    routes.forEach(async (route) => {
      await TestBed.runInInjectionContext(
        async () => await router.navigate([route])
      );
      const result = await lastValueFrom(app.showFooter$);

      if (routesWithFooter.some((rwf) => rwf.includes(route))) {
        expect(result).toBeTruthy();
      } else {
        expect(result).toBeFalsy();
      }
    });
  });
});

class MockAuthService {
  public readonly loginStatus$ = of(true);
  public readonly isLoggedIn = true;
  public getToken() {
    return 'test-token';
  }
}
