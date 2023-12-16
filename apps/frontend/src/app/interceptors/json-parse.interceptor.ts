import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JsonParser } from '../utils/json-parser/base.json-parser';

/**
 * Interceptor that parses the response body as JSON.
 *
 * @see {@link JsonParser}
 * @implements {HttpInterceptor}
 */
@Injectable()
export class JsonParseInterceptor implements HttpInterceptor {
  public constructor(private readonly jsonParser: JsonParser) {}

  /** @inheritdoc */
  public intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler) {
    if (httpRequest.responseType === 'json') {
      return this.handleJsonResponse(httpRequest, next); // If the expected response type is JSON then handle it here.
    } else {
      return next.handle(httpRequest);
    }
  }

  /**
   * Handles the JSON response.
   *
   * @param {HttpRequest<unknown>} httpRequest - The HTTP request.
   * @param {HttpHandler} next - The HTTP handler.
   * @returns {Observable<HttpEvent<unknown>>} The HTTP event.
   */
  private handleJsonResponse(
    httpRequest: HttpRequest<unknown>,
    next: HttpHandler
  ) {
    httpRequest = httpRequest.clone({ responseType: 'text' }); // Override the responseType to disable the default JSON parsing.
    return next
      .handle(httpRequest)
      .pipe(map((event) => this.parseJsonResponse(event)));
  }

  /**
   * Parses the JSON response.
   *
   * @param {HttpEvent<unknown>} event - The HTTP event.
   * @returns {HttpEvent<unknown>} The HTTP event.
   */
  private parseJsonResponse(event: HttpEvent<unknown>) {
    if (event instanceof HttpResponse && typeof event.body === 'string') {
      return event.clone({ body: this.jsonParser.parse(event.body) });
    } else {
      return event;
    }
  }
}
