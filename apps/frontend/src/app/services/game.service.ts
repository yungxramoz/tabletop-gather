import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { API_BASE_URL } from '../app.config';
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
   * @returns {Observable<GameDto[]>} - The games
   */
  public getAllGames(name: string): Observable<GameDto[]> {
    return this.http
      .get<object[]>(this.gamesUrl, {
        params: { name },
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
}
