import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.config';
import { GameDto } from '../models/game/game.dto';
import { ResponseHandler } from '../utils/response.handler';

import { GameService } from './game.service';

describe(GameService.name, () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GameService,
        { provide: API_BASE_URL, useValue: 'http://api.example.com' },
        ResponseHandler,
      ],
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllGames', () => {
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
        `http://api.example.com/games?name=${name}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(games);
    });
  });

  describe('getAllMyGames', () => {
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
});
