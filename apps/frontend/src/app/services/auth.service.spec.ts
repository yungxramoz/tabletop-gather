import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AUTH_BASE_URL, LOCAL_STORAGE } from '../app.config';
import { LoginUserDto } from '../models/login-user.dto';
import { LoginResponse } from '../models/login.response';
import { Model } from '../models/model.type';
import { RegisterUserDto } from '../models/register-user.dto';
import { UserDto } from '../models/user.dto';
import { AuthService, LS_EXPIRES_AT_KEY, LS_TOKEN_KEY } from './auth.service';

describe(AuthService.name, () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let authBaseUrl: string;
  let localStorageMock: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: AUTH_BASE_URL,
          useValue: 'http://mock:1234/auth',
        },
        {
          provide: LOCAL_STORAGE,
          useClass: MockLocalStorage,
        },
      ],
    });

    localStorageMock = TestBed.inject(LOCAL_STORAGE);
    authBaseUrl = TestBed.inject(AUTH_BASE_URL);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorageMock.clear();
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should send a POST request to the login endpoint and return the login result', () => {
      // Arrange
      const loginUser: Model<LoginUserDto> = {};
      const expectedLoginResponse: LoginResponse = {} as LoginResponse;

      // Act
      authService.login(loginUser).subscribe((loginResult) => {
        // Assert
        expect(loginResult).toEqual(expectedLoginResponse);
      });

      // Assert
      const req = httpMock.expectOne(`${authBaseUrl}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(expectedLoginResponse);
    });
  });

  describe('signup', () => {
    it('should send a POST request to the signup endpoint and return the user DTO', () => {
      // Arrange
      const registerUser: Model<RegisterUserDto> = {};
      const expectedUserDto: UserDto = {} as unknown as UserDto;

      // Act
      authService.signup(registerUser).subscribe((userDto) => {
        // Assert
        expect(userDto).toEqual(expectedUserDto);
      });

      // Assert
      const req = httpMock.expectOne(`${authBaseUrl}/signup`);
      expect(req.request.method).toBe('POST');
      req.flush(expectedUserDto);
    });
  });

  describe('getToken', () => {
    it('should return the token from local storage if the user is logged in', () => {
      // Arrange
      const expiresAt = new Date();
      const expiresIn = 10000;
      expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
      localStorageMock.setItem(LS_TOKEN_KEY, 'token');
      localStorageMock.setItem(
        LS_EXPIRES_AT_KEY,
        JSON.stringify(expiresAt.valueOf())
      );

      // Act
      const token = authService.getToken();

      // Assert
      expect(token).toBe('token');
    });

    it('should return null if the user is not logged in', () => {
      // Arrange
      localStorageMock.removeItem(LS_TOKEN_KEY); // Already null, because we clear LS in afterEach() - just to show the intent

      // Act
      const token = authService.getToken();

      // Assert
      expect(token).toBeNull();
    });

    it('should return null if the token is expired', () => {
      // Arrange
      const expiresAt = new Date();
      const expiresIn = -1;
      expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
      localStorageMock.setItem(LS_TOKEN_KEY, 'token');
      localStorageMock.setItem(
        LS_EXPIRES_AT_KEY,
        JSON.stringify(expiresAt.valueOf())
      );

      // Act
      const token = authService.getToken();

      // Assert
      expect(token).toBe(null);
    });
  });

  describe('logout', () => {
    it('should remove the token and expiration from local storage and update the login status', () => {
      // Arrange
      jest.spyOn(localStorageMock, 'removeItem');
      jest.spyOn((authService as any).loginStatusSubject, 'next');
      // Act

      authService.logout();

      // Assert
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(LS_TOKEN_KEY);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        LS_EXPIRES_AT_KEY
      );
      expect((authService as any).loginStatusSubject.next).toHaveBeenCalledWith(
        false
      );
    });
  });
});

class MockLocalStorage implements Storage {
  private store: Record<string, string> = {};

  public length = 0;

  public clear(): void {
    this.store = {};
  }

  public getItem(key: string): string | null {
    return this.store[key] || null;
  }

  public key(): string | null {
    throw new Error('Method not implemented.');
  }

  public removeItem(key: string): void {
    delete this.store[key];
  }

  public setItem(key: string, value: string): void {
    this.store[key] = value;
  }
}
