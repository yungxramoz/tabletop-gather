import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { AuthService } from './services/auth.service';

describe(AppComponent.name, () => {
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
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'tabletop gather'
    );
  });

  it(`should have correct tab title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Tabletop Gather');
  });
});

class MockAuthService {
  public readonly loginStatus$ = of(true);
  public readonly isLoggedIn = true;
  public getToken() {
    return 'test-token';
  }
}
