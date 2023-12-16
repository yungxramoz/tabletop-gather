import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbThemeModule } from '@nebular/theme';
import { of } from 'rxjs';
import { ROUTE_EVENTS } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

describe(LoginComponent.name, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: Partial<AuthService>;
  let router: Router;

  beforeEach(async () => {
    // Creating a mock AuthService
    mockAuthService = {
      login: jest.fn().mockReturnValue(of(null)),
      signup: jest.fn().mockReturnValue(of(null)),
    };

    await TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), LoginComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to events page on successful login', () => {
    const loginUser = { email: 'test@user.com', password: 'password' };
    component.onCredentialsCreated(loginUser);
    expect(mockAuthService.login).toHaveBeenCalledWith(loginUser);
    expect(router.navigate).toHaveBeenCalledWith(['/' + ROUTE_EVENTS]);
  });

  it('should call signup method on user registration', () => {
    const registerUser = {
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password',
    }; // Mock RegisterUser object
    component.onUserCreated(registerUser);
    expect(mockAuthService.signup).toHaveBeenCalledWith(registerUser);
  });
});
