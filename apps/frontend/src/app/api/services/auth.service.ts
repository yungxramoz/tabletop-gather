import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { API_BASE_URL } from '../../app.config';
import { LoginUserDto } from '../model/login-user.dto';
import { Model } from '../model/model.type';

type LoginResult = {
  token: string;
  expiresIn: number;
};

const LS_TOKEN_KEY = 'id_token';
const LS_EXPIRES_AT_KEY = 'expires_at';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = `${this.apiBaseUrl}/auth`;

  public constructor(
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly http: HttpClient
  ) {}

  public login(loginUser: Model<LoginUserDto>): Observable<LoginResult> {
    return this.http
      .post<LoginResult>(`${this.authUrl}/login`, loginUser, {
        responseType: 'json',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        },
      })
      .pipe(
        tap((response) => this.setSession(response)),
        shareReplay()
      );
  }

  public getToken(): string | null {
    return localStorage.getItem(LS_TOKEN_KEY);
  }

  public logout(): void {
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_EXPIRES_AT_KEY);
  }

  public isLoggedIn(): boolean {
    const expiresAt = JSON.parse(
      localStorage.getItem(LS_EXPIRES_AT_KEY) || '{}'
    );
    return new Date().valueOf() < expiresAt;
  }

  private setSession(response: LoginResult): void {
    const expiresAt = new Date();
    const expiresIn = response.expiresIn / 1000; // convert ms to s
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    localStorage.setItem(LS_TOKEN_KEY, response.token);
    localStorage.setItem(
      LS_EXPIRES_AT_KEY,
      JSON.stringify(expiresAt.valueOf())
    );
  }
}
