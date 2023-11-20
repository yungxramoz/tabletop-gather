import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { API_BASE_URL } from '../app.config';
import { Model } from '../models/model.type';
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
   * Deletes a user by its id.
   *
   * @param {string} id - The id of the user to delete
   * @returns {Observable<string>} - The id of the deleted user
   */
  public deleteUser(id: string): Observable<string> {
    return this.http
      .delete(`${this.usersUrl}/${id}`, {
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
   * Updates a user.
   *
   * @param {string} id - The id of the user to update
   * @param {Model<UserDto>} user - The user to update
   * @returns {Observable<string>} - The id of the updated user
   *
   */
  public updateUser(id: string, user: Model<UserDto>): Observable<string> {
    return this.http
      .put(`${this.usersUrl}/${id}`, user, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride: `User was updated successfully`,
          successTitleOverride: 'User updated 👍',
        }),
        filter((response) => response !== null),
        map((response) => response?.body as string)
      );
  }
}
