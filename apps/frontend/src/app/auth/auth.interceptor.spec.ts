import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe(AuthInterceptor.name, () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should add Authorization header with token when token is available', () => {
    // Arrange
    const token = 'test-token';
    const url = 'https://api.example.com/data';
    const requestData = { name: 'John Doe' };
    MockAuthService.token = token;

    // Act
    httpClient.get(url).subscribe();

    // Assert
    const httpRequest = httpMock.expectOne(url);
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      `Bearer ${token}`
    );
    httpRequest.flush(requestData);
  });

  it('should not add Authorization header when token is not available', () => {
    // Arrange
    const token = null;
    const url = 'https://api.example.com/data';
    const requestData = { name: 'John Doe' };
    MockAuthService.token = token;

    // Act
    httpClient.get(url).subscribe();

    // Assert
    const httpRequest = httpMock.expectOne(url);
    expect(httpRequest.request.headers.has('Authorization')).toBe(false);
    httpRequest.flush(requestData);
  });

  it('should pass through the request without modifying it when token is not available', () => {
    const token = null;
    const url = 'https://api.example.com/data';
    const requestData = { name: 'John Doe' };
    MockAuthService.token = token;

    // Act
    httpClient.get(url).subscribe((response) => {
      // Assert
      expect(response).toEqual(requestData);
    });

    // Assert
    const httpRequest = httpMock.expectOne(url);
    httpRequest.flush(requestData);
  });
});

class MockAuthService {
  public static token: string | null = null;

  public getToken() {
    return MockAuthService.token;
  }
}
