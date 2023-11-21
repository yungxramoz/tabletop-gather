import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  shareReplay,
  tap,
} from 'rxjs';
import { AUTH_BASE_URL, LOCAL_STORAGE } from '../app.config';
import { LoginUser } from '../models/login-user.dto';
import { LoginResponse } from '../models/login.response';
import { RegisterUser } from '../models/register-user.dto';
import { UserDto } from '../models/user.dto';
import { ResponseHandler } from '../utils/response.handler';

/**
 * The key used to store the JWT token in local storage.
 */
export const LS_TOKEN_KEY = 'id_token';

/**
 * The key used to store the JWT expiry date in local storage.
 */
export const LS_EXPIRES_AT_KEY = 'expires_at';

/**
 * Service for handling authentication. Retrieves the JWT token from the backend and stores it in local storage.
 * Handles JWT expiry.
 *
 * @property {Observable<boolean>} loginStatus$ - An observable that emits the current login status. Emits `true` when the user is logged in, `false` otherwise.
 * @property {boolean} loginStatus - The current login status. `true` when the user is logged in, `false` otherwise.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginStatusSubject = new BehaviorSubject<boolean>(
    this.isLoggedIn() // This will make sure that the user is logged in when the app is reloaded and the JWT token is still valid
  );

  public readonly loginStatus$ = this.loginStatusSubject.asObservable();

  public get loginStatus(): boolean {
    return this.loginStatusSubject.getValue();
  }

  public constructor(
    @Inject(AUTH_BASE_URL) private readonly authBaseUrl: string,
    @Inject(LOCAL_STORAGE) private readonly localStorage: Storage,
    private readonly http: HttpClient,
    private readonly responseHandler: ResponseHandler
  ) {}

  /**
   * Logs in the given user via auth endpoint and stores the JWT token in local storage.
   *
   * @param {LoginUser} loginUser - The user to log in
   * @returns {Observable<LoginResponse>} - An observable that emits the login result
   */
  public login(loginUser: LoginUser): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.authBaseUrl}/login`, loginUser, {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        filter((response) => response !== null),
        map((response) => response?.body as LoginResponse),
        tap((loginResult) => this.setSession(loginResult)),
        shareReplay(),
        tap(() => this.loginStatusSubject.next(true))
      );
  }

  /**
   * Signs up the given user via auth endpoint. You'll need to log in the user afterwards to get a JWT token.
   *
   * @param {RegisterUser} registerUser - The user to register
   * @returns {Observable<UserDto>} - An observable that emits the registered user
   */
  public signup(registerUser: RegisterUser): Observable<UserDto> {
    return this.http
      .post<UserDto>(`${this.authBaseUrl}/signup`, registerUser, {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        this.responseHandler.handleResponse({
          overrideApiError: {
            DataIntegrityViolationException: {
              title: 'A user with that email already exists',
              message: 'Try logging in instead',
            },
          },
          successMessageOverride: 'You have successfully signed up',
          successTitleOverride: 'That worked! 👌',
        }),
        filter((response) => response !== null),
        map((response) => response?.body as UserDto)
      );
  }

  /**
   * Gets the the current user from the JWT token.
   *
   * @returns {Observable<UserDto>} - An observable that emits the current user
   */
  public me(): Observable<UserDto> {
    return this.http
      .get<UserDto>(`${this.authBaseUrl}/me`, {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        filter((response) => response !== null),
        map((response) => response?.body as UserDto),
        shareReplay()
      );
  }

  /**
   * Returns the JWT token from local storage if the user is logged in.
   *
   * @returns {string | null} - The JWT token if the user is logged in, `null` otherwise
   */
  public getToken(): string | null {
    return this.isLoggedIn() ? this.localStorage.getItem(LS_TOKEN_KEY) : null;
  }

  /**
   * Logs the user out by removing the JWT token from local storage.
   */
  public logout(): void {
    this.localStorage.removeItem(LS_TOKEN_KEY);
    this.localStorage.removeItem(LS_EXPIRES_AT_KEY);
    this.loginStatusSubject.next(false);
  }

  /**
   * Checks if the user is logged in by checking if the JWT token is present in local storage and if it is still valid.
   *
   * @returns {boolean} - `true` if the user is logged in, `false` otherwise
   */
  private isLoggedIn(): boolean {
    const expiresAt = JSON.parse(
      this.localStorage.getItem(LS_EXPIRES_AT_KEY) || '{}'
    );

    return new Date().valueOf() < expiresAt;
  }

  /**
   * Stores the JWT token and expiry date in local storage.
   *
   * @param {LoginResponse} response - The login response to store
   */
  private setSession(response: LoginResponse): void {
    const expiresAt = new Date();
    const expiresIn = response.expiresIn / 1000; // convert ms to s
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    this.localStorage.setItem(LS_TOKEN_KEY, response.token);
    this.localStorage.setItem(
      LS_EXPIRES_AT_KEY,
      JSON.stringify(expiresAt.valueOf())
    );
  }
}
