import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../../app.config';
import { Uid } from '../api.util';
import { Model } from '../model/model.type';
import { UserDto } from '../model/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly usersUrl = `${this.apiBaseUrl}/users`;

  constructor(
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly http: HttpClient
  ) {}

  getAllUsers(): Observable<UserDto[]> {
    return this.http
      .get<string[]>(`${this.usersUrl}`, {
        responseType: 'json',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
      })
      .pipe(
        map((response) =>
          response.map((user: unknown) => UserDto.fromJson(user))
        )
      );
  }

  createUser(user: Model<UserDto>): Observable<Uid> {
    return this.http
      .post(`${this.usersUrl}`, user, {
        responseType: 'text',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        },
      })
      .pipe(
        map((response: unknown) => {
          console.assert(typeof response === 'string');
          return response as Uid;
        })
      );
  }

  deleteUser(id: Uid): Observable<string> {
    return this.http.delete(`${this.usersUrl}/${id}`, {
      responseType: 'text',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      },
    });
  }
}
