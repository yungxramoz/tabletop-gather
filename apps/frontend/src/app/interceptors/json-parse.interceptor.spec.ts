import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JsonParser } from '../utils/json-parser/base.json-parser';
import { JsonParseInterceptor } from './json-parse.interceptor';

describe(JsonParseInterceptor.name, () => {
  let jsonParseInterceptor: JsonParseInterceptor;
  let httpMock: HttpTestingController;
  let jsonParser: JsonParser;
  let mockInterceptor: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JsonParseInterceptor, JsonParser],
    });
    jsonParseInterceptor = TestBed.inject(JsonParseInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    mockInterceptor = TestBed.inject(HttpHandler);

    jsonParser = new MockJsonParser();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(jsonParseInterceptor).toBeTruthy();
  });

  it('should handle JSON response correctly', () => {
    // Arrange
    const url = '/api/data';
    const responseData = { message: 'Hello, World!' };
    const httpRequest = new HttpRequest('GET', url, { responseType: 'json' });

    // Act
    jsonParseInterceptor
      .intercept(httpRequest, mockInterceptor)
      .subscribe((event) => {
        // Assert
        expect(event instanceof HttpResponse).toBe(true);
        expect((event as HttpResponse<unknown>).body).toEqual(responseData);
      });

    // Assert
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush(responseData);
  });

  it('should pass through non-JSON response', () => {
    // Arrange
    const url = '/api/data';
    const responseData = 'Hello, World!';
    const httpRequest = new HttpRequest('GET', url, { responseType: 'text' });

    // Act
    jsonParseInterceptor
      .intercept(httpRequest, mockInterceptor)
      .subscribe((event) => {
        // Assert
        expect(event instanceof HttpResponse).toBe(true);
        expect((event as HttpResponse<unknown>).body).toEqual(responseData);
      });

    // Assert
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush(responseData);
  });

  it('should parse JSON response correctly', () => {
    // Arrange
    const url = '/api/data';
    const responseData = JSON.stringify({ message: 'Hello, World!' });
    const parsedData = { message: 'Hello, World!' };
    const httpRequest = new HttpRequest('GET', url, { responseType: 'text' });

    jest.spyOn(jsonParser, 'parse').mockReturnValue(parsedData);

    // Act
    jsonParseInterceptor
      .intercept(httpRequest, mockInterceptor)
      .subscribe((event) => {
        // Assert
        expect(event instanceof HttpResponse).toBe(true);
        expect((event as HttpResponse<unknown>).body).toEqual(parsedData);
        expect(jsonParser.parse).toHaveBeenCalledWith(responseData);
      });

    // Assert
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush(responseData);
  });
});

class MockJsonParser extends JsonParser {
  public parse(text: string): unknown {
    return JSON.parse(text);
  }
}
