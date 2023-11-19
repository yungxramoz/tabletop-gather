import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from '../app.config';
import { UserDto } from '../models/user.dto';
import { ResponseHandler } from '../utils/response.handler';
import { UsersService } from './users.service';

describe(UsersService.name, () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  let apiBaseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: API_BASE_URL,
          useValue: 'http://mock:123/api',
        },
        UsersService,
        ResponseHandler,
      ],
    });

    apiBaseUrl = TestBed.inject(API_BASE_URL);
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllUsers', () => {
    it('should return an Observable of UserDto[]', () => {
      // Arrange
      const mockUsers: UserDto[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          username: 'jdoe',
          email: 'john@doe.com',
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          username: 'jsmith',
          email: 'jane@smith.com',
        },
      ];

      // Act
      service.getAllUsers().subscribe((users) => {
        // Assert
        expect(users).toEqual(mockUsers);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('deleteUser', () => {
    it('should return an Observable of string', () => {
      // Arrange
      const mockUserId = '1';

      // Act
      service.deleteUser(mockUserId).subscribe((userId) => {
        // Assert
        expect(userId).toEqual(mockUserId);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/users/${mockUserId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockUserId);
    });
  });

  describe('updateUser', () => {
    it('should return an Observable of string', () => {
      // Arrange
      const mockUserId = '1';
      const mockUser: UserDto = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        username: 'jdoe',
        email: 'john@doe.com',
      };

      // Act
      service.updateUser(mockUserId, mockUser).subscribe((userId) => {
        // Assert
        expect(userId).toEqual(mockUserId);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/users/${mockUserId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockUserId);
    });
  });
});
