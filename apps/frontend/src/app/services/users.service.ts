import { filter, map, Observable, shareReplay } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { API_BASE_URL } from '../app.config';
import { JwtDto } from '../models/jwt.dto';
import { Model } from '../models/model.type';
import { UserUpdateDto } from '../models/user-update.dto';
import { UserDto } from '../models/user.dto';
import { ResponseHandler } from '../utils/response.handler';

/**
 * Service for all user related API calls.
 */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly usersUrl = `${this.apiBaseUrl}/users`;

  public constructor(
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly http: HttpClient,
    private readonly responseHandler: ResponseHandler
  ) {}

  /**
   * Gets all users.
   *
   * @returns {Observable<UserDto[]>} - The users
   */
  public getAllUsers(): Observable<UserDto[]> {
    return this.http
      .get<string[]>(this.usersUrl, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        // TODO: Use LoadingWrapper
        this.responseHandler.handleErrorResponse(),
        filter((response) => response !== null),
        map((response) => response?.body as string[]),
        map((usersJson) =>
          usersJson.map((user: unknown) => UserDto.fromJson(user))
        )
      );
  }

  /**
   * Deletes the current authenticated user.
   *
   * @returns {Observable<string>} - The id of the deleted user
   */
  public deleteMe(): Observable<string> {
    return this.http
      .delete(`${this.usersUrl}/me`, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        // TODO: Use LoadingWrapper
        this.responseHandler.handleResponse({
          successMessageOverride: `User was deleted successfully`,
          successTitleOverride: 'User deleted 👊',
        }),
        filter((response) => response !== null),
        map((response) => response?.body as string)
      );
  }

  /**
   * Updates the current authenticated user.
   *
   * @param {Model<UserUpdateDto>} user - The user to update
   * @returns {Observable<string>} - The id of the updated user
   *
   */
  public updateMe(user: Model<UserUpdateDto>): Observable<JwtDto> {
    return this.http
      .put(`${this.usersUrl}/me`, user, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride: `User was updated successfully`,
          successTitleOverride: 'User updated 👍',
        }),
        filter((response) => response !== null),
        map((response) => response?.body as JwtDto)
      );
  }

  /**
   * Gets the the current user from the JWT token.
   *
   * @returns {Observable<UserDto>} - An observable that emits the current user
   */
  public me(): Observable<UserDto> {
    return this.http
      .get<UserDto>(`${this.usersUrl}/me`, {
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
}
