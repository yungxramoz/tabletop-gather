import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { API_BASE_URL } from '../app.config';
import { GamePlanDto } from '../models/game/game-plan.dto';
import { GameDto } from '../models/game/game.dto';
import { ResponseHandler } from '../utils/response.handler';

/**
 * Service for all game related API calls.
 */
@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly gamesUrl = `${this.apiBaseUrl}/games`;

  public constructor(
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly http: HttpClient,
    private readonly responseHandler: ResponseHandler
  ) {}

  /**
   * Gets all games whose name contains the given search term.
   *
   * @param {string} name - The search term
   * @param {number} page - The page
   * @param {number} pageSize - The page size
   * @returns {Observable<GameDto[]>} - The games
   */
  public getAllGames(
    name = '',
    page = 0,
    pageSize = 20
  ): Observable<GameDto[]> {
    const params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http
      .get<{ content: object[] }>(this.gamesUrl, {
        params,
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        map((response) => response?.body),
        map((gamesJson) =>
          (gamesJson?.content ?? []).map((plan: unknown) =>
            GameDto.fromJson(plan)
          )
        )
      );
  }

  /**
   * Gets all my games.
   *
   * @returns {Observable<GameDto[]>} - My games
   */
  public getAllMyGames(): Observable<GameDto[]> {
    return this.http
      .get<object[]>(`${this.gamesUrl}/me`, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        filter((response) => response !== null),
        map((response) => response?.body as object[]),
        map((gamesJson) =>
          gamesJson.map((plan: unknown) => GameDto.fromJson(plan))
        )
      );
  }

  /**
   * Gets all games of attending users on a plan
   *
   * @param {string} planId - The id of the plan
   * @returns {Observable<GamePlanDto[]>} - The games of attending users on a plan
   */
  public getGamesByPlanId(planId: string): Observable<GamePlanDto[]> {
    return this.http
      .get<object[]>(`${this.gamesUrl}/plan/${planId}`, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        filter((response) => response !== null),
        map((response) => response?.body as object[]),
        map((gamesJson) =>
          gamesJson.map((plan: unknown) => GamePlanDto.fromJson(plan))
        )
      );
  }

  /**
   * Adds a game to the collection.
   *
   * @param {string} gameId - The id of the game to add
   * @returns {Observable<GameDto>} - The added game
   */
  public addGameToCollection(gameId: string): Observable<GameDto> {
    return this.http
      .post<object>(
        `${this.gamesUrl}/${gameId}/add`,
        { gameId },
        {
          observe: 'response',
          responseType: 'json',
        }
      )
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride:
            'You have successfully added the game to your collection',
          successTitleOverride: 'That worked! 👌',
        }),
        filter((response) => response !== null),
        map((response) => GameDto.fromJson(response?.body))
      );
  }

  /**
   * Deletes a game from the collection.
   *
   * @param {string} gameId - The id of the game to delete
   * @returns {Observable<GameDto>} - The deleted game
   */
  public deleteFromCollection(gameId: string): Observable<GameDto> {
    return this.http
      .delete<object>(`${this.gamesUrl}/${gameId}/remove`, {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride:
            'You have successfully removed the game from your collection',
          successTitleOverride: 'That worked! 👌',
        }),
        filter((response) => response !== null),
        map((response) => GameDto.fromJson(response?.body))
      );
  }
}
