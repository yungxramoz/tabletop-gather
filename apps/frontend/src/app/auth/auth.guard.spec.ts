import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { isAuthenticatedOrRedirectToLogin } from './auth.guard';
import { AuthService } from './auth.service';

describe(isAuthenticatedOrRedirectToLogin.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    });
  });

  it('should allow access when the user is logged in', async () => {
    // Arrange
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    MockAuthService.loginStatusControl = true;

    // Act
    const result = await TestBed.runInInjectionContext(() =>
      isAuthenticatedOrRedirectToLogin(route, state)
    );

    // Assert
    expect(result).toBe(true);
  });

  it('should redirect to login when the user is not logged in', async () => {
    // Arrange
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    MockAuthService.loginStatusControl = false;

    // Act
    const result = await TestBed.runInInjectionContext(() =>
      isAuthenticatedOrRedirectToLogin(route, state)
    );

    // Assert
    expect(result).toBe(false);
  });
});

class MockAuthService {
  public static loginStatusControl = false;
  public get loginStatus() {
    return MockAuthService.loginStatusControl;
  }
}
