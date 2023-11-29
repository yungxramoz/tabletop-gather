import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_BASE_URL } from '../app.config';
import { JwtDto } from '../models/jwt.dto';
import { PasswordUpdate } from '../models/user/password-update.dto';
import { UserUpdateDto } from '../models/user/user-update.dto';
import { UserDto } from '../models/user/user.dto';
import { ResponseHandler } from '../utils/response.handler';
import { UsersService } from './user.service';

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

  describe('deleteMe', () => {
    it('should return an Observable of string', () => {
      // Arrange
      const mockUserId = '1';

      // Act
      service.deleteMe().subscribe((userId) => {
        // Assert
        expect(userId).toEqual(mockUserId);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/users/me`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockUserId);
    });
  });

  describe('updateMe', () => {
    it('should return an Observable of string', () => {
      // Arrange
      const mockUserId = '1';
      const mockUser: UserUpdateDto = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        username: 'jdoe',
        email: 'john@doe.com',
        password: 'test',
      };

      // Act
      service.updateMe(mockUser).subscribe((userId) => {
        // Assert
        expect(userId).toEqual(mockUserId);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/users/me`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockUserId);
    });
  });

  describe('updateMyPassword', () => {
    it('should return an Observable of JwtDto', () => {
      // Arrange
      const mockJwtDto = {} as unknown as JwtDto;
      const mockPasswordUpdate: PasswordUpdate = {
        email: 'john@doe.com',
        password: 'test',
        newPassword: 'test2',
      };

      // Act
      service.updateMyPassword(mockPasswordUpdate).subscribe((jwtDto) => {
        // Assert
        expect(jwtDto).toEqual(mockJwtDto);
      });

      // Assert

      const req = httpMock.expectOne(`${apiBaseUrl}/users/me/password`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockJwtDto);
    });
  });

  describe('me', () => {
    it('should send a GET request to the me endpoint and return the user DTO', () => {
      // Arrange
      const expectedUserDto: UserDto = {} as unknown as UserDto;

      // Act
      service.me().subscribe((userDto) => {
        // Assert
        expect(userDto).toEqual(expectedUserDto);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/users/me`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedUserDto);
    });
  });
});
