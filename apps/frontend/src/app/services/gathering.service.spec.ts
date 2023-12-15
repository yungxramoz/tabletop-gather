import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from '../app.config';
import { UpsertGatheringDto } from '../models/gathering/upsert-gathering.dto';
import { ResponseHandler } from '../utils/response.handler';
import { GatheringService } from './gathering.service';

describe(GatheringService.name, () => {
  let service: GatheringService;
  let httpMock: HttpTestingController;
  let apiBaseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GatheringService,
        { provide: API_BASE_URL, useValue: 'http://api.example.com' },
        ResponseHandler,
      ],
    });
    apiBaseUrl = TestBed.inject(API_BASE_URL);
    service = TestBed.inject(GatheringService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(GatheringService.prototype.attendGathering.name, () => {
    it('should send a POST request to add gatherings', () => {
      const upsertGatheringDtos: UpsertGatheringDto[] = [
        { id: '1', canAttend: true },
        { id: '2', canAttend: false },
      ];

      service.attendGathering(upsertGatheringDtos).subscribe();

      const req = httpMock.expectOne(`${apiBaseUrl}/gatherings/attend`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(upsertGatheringDtos);
      expect(req.request.responseType).toBe('text');
      req.flush(null);
    });

    it('should handle the response', () => {
      const upsertGatheringDtos: UpsertGatheringDto[] = [
        { id: '1', canAttend: true },
        { id: '2', canAttend: false },
      ];

      service.attendGathering(upsertGatheringDtos).subscribe();

      const req = httpMock.expectOne(`${apiBaseUrl}/gatherings/attend`);
      req.flush(null, { status: 200, statusText: 'OK' });
    });
  });
});
