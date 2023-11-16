import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../../app.config';
import { Uid } from '../api.util';
import { UserDto } from '../model/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly usersUrl = `${this.apiBaseUrl}/users`;

  public constructor(
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly http: HttpClient
  ) {}

  // TODO: Use LoadingWrapper
  public getAllUsers(): Observable<UserDto[]> {
    return this.http
      .get<string[]>(`${this.usersUrl}`, {
        responseType: 'json',
      })
      .pipe(
        map((response) =>
          response.map((user: unknown) => UserDto.fromJson(user))
        )
      );
  }

  // TODO: Use LoadingWrapper
  public deleteUser(id: Uid): Observable<string> {
    return this.http.delete(`${this.usersUrl}/${id}`, {
      responseType: 'text',
    });
  }
}
