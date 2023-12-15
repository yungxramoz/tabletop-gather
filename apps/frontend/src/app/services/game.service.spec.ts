import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.config';
import { GameDto } from '../models/game/game.dto';
import { ResponseHandler } from '../utils/response.handler';

import { GameOwnersDto } from '../models/game/game-owners.dto';
import { GamePlanDto } from '../models/game/game-plan.dto';
import { DateTimeGathering } from '../models/gathering/date-time-gathering.dto';
import { GameService } from './game.service';

describe(GameService.name, () => {
  let service: GameService;
  let httpMock: HttpTestingController;
  let apiBaseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GameService,
        { provide: API_BASE_URL, useValue: 'http://api.example.com' },
        ResponseHandler,
      ],
    });
    apiBaseUrl = TestBed.inject(API_BASE_URL);
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(GameService.prototype.getAllGames.name, () => {
    it('should return an array of GameDto objects', () => {
      // Arrange
      const name = 'test';
      const games: GameDto[] = [
        { id: '1', name: 'Test Game 1' } as GameDto,
        { id: '2', name: 'Test Game 2' } as GameDto,
      ];

      // Act
      const result$: Observable<GameDto[]> = service.getAllGames(name);

      // Assert
      result$.subscribe((result) => {
        expect(result).toEqual(games);
      });

      const req = httpMock.expectOne(
        `http://api.example.com/games?name=${name}&page=0&pageSize=20`
      );
      expect(req.request.method).toBe('GET');
      req.flush(games);
    });
  });

  describe(GameService.prototype.getAllMyGames.name, () => {
    it('should return an array of GameDto objects', () => {
      // Arrange
      const myGames: GameDto[] = [
        { id: '1', name: 'My Game 1' } as GameDto,
        { id: '2', name: 'My Game 2' } as GameDto,
      ];

      // Act
      const result$: Observable<GameDto[]> = service.getAllMyGames();

      // Assert
      result$.subscribe((result) => {
        expect(result).toEqual(myGames);
      });

      const req = httpMock.expectOne(`http://api.example.com/games/me`);
      expect(req.request.method).toBe('GET');
      req.flush(myGames);
    });
  });

  describe(GameService.prototype.getGamesByPlanId.name, () => {
    it('should return an array of GamePlanDto objects', () => {
      // Arrange
      const myGames: GamePlanDto[] = [
        {
          games: [{ id: '1', name: 'My Game 1' } as GameOwnersDto],
          gatheringDto: {} as DateTimeGathering,
        } as GamePlanDto,
        {
          games: [{ id: '2', name: 'My Game 2' } as GameOwnersDto],
          gatheringDto: {} as DateTimeGathering,
        } as GamePlanDto,
      ];

      // Act
      const result$: Observable<GamePlanDto[]> = service.getGamesByPlanId('1');

      // Assert
      result$.subscribe((result) => {
        expect(result).toEqual(myGames);
      });

      const req = httpMock.expectOne(`http://api.example.com/games/plan/1`);
      expect(req.request.method).toBe('GET');
      req.flush(myGames);
    });
  });

  describe(GameService.prototype.addGameToCollection.name, () => {
    it('should add a game to the collection', () => {
      const gameId = '123abc';

      service.addGameToCollection(gameId).subscribe((response) => {
        expect(response).toEqual({});
      });

      const req = httpMock.expectOne(`${apiBaseUrl}/games/${gameId}/add`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ gameId });
    });
  });

  describe(GameService.prototype.deleteFromCollection.name, () => {
    it('should delete a game from the collection', () => {
      const gameId = '123abc';

      service.deleteFromCollection(gameId).subscribe((response) => {
        expect(response).toEqual({});
      });

      const req = httpMock.expectOne(`${apiBaseUrl}/games/${gameId}/remove`);
      expect(req.request.method).toBe('DELETE');
    });
  });
});
