import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from '../app.config';
import { GameDto } from '../models/game/game.dto';
import { CreatePlan } from '../models/plan/create-plan.dto';
import { DetailPlanDto } from '../models/plan/detail-plan.dto';
import { OverviewPlanDto } from '../models/plan/overview-plan.dto';
import { UpdatePlan } from '../models/plan/update-plan.dto';
import { UserDto } from '../models/user/user.dto';
import { ResponseHandler } from '../utils/response.handler';
import { PlanService } from './plan.service';

describe(PlanService.name, () => {
  let service: PlanService;
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
        PlanService,
        ResponseHandler,
      ],
    });

    apiBaseUrl = TestBed.inject(API_BASE_URL);
    service = TestBed.inject(PlanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllPublicPlans', () => {
    it('should return an Observable of OverviewPlanDto[]', () => {
      // Arrange
      const mockPlans: OverviewPlanDto[] = [
        {
          id: '1',
          name: 'Plan 1',
          description: 'Plan 1 description',
          game: {} as GameDto,
          gatheringDates: [],
          isPrivate: false,
          playerLimit: 0,
          ownerName: 'Hans',
        },
        {
          id: '2',
          name: 'Plan 2',
          description: 'Plan 2 description',
          game: {} as GameDto,
          gatheringDates: [],
          isPrivate: false,
          playerLimit: 0,
          ownerName: 'Hans',
        },
      ];

      // Act
      service.getAllPublicPlans().subscribe((plans) => {
        // Assert
        expect(plans).toEqual(mockPlans);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/plans`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPlans);
    });
  });

  describe('getAllMyPlans', () => {
    it('should return an Observable of OverviewPlanDto[]', () => {
      // Arrange
      const mockPlans: OverviewPlanDto[] = [
        {
          id: '1',
          name: 'Plan 1',
          description: 'Plan 1 description',
          game: {} as GameDto,
          gatheringDates: [],
          isPrivate: false,
          playerLimit: 0,
          ownerName: 'Hans',
        },
        {
          id: '2',
          name: 'Plan 2',
          description: 'Plan 2 description',
          game: {} as GameDto,
          gatheringDates: [],
          isPrivate: false,
          playerLimit: 0,
          ownerName: 'Hans',
        },
      ];

      // Act
      service.getAllMyPlans().subscribe((plans) => {
        // Assert
        expect(plans).toEqual(mockPlans);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/plans/me`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPlans);
    });
  });

  describe('getPlanById', () => {
    it('should return an Observable of DetailPlanDto', () => {
      // Arrange
      const mockPlanId = '1';
      const mockPlan: DetailPlanDto = {
        id: '1',
        name: 'Plan 1',
        description: 'Plan 1 description',
        game: {} as GameDto,
        gatherings: [],
        isPrivate: false,
        playerLimit: 0,
        owner: {} as UserDto,
      };

      // Act
      service.getPlanById(mockPlanId).subscribe((plan) => {
        // Assert
        expect(plan).toEqual(mockPlan);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/plans/${mockPlanId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPlan);
    });
  });

  describe('createPlan', () => {
    it('should return an Observable of Uuid', () => {
      // Arrange
      const mockPlan: CreatePlan = {
        name: 'Plan 1',
        description: 'Plan 1 description',
        gatherings: [],
        isPrivate: false,
        playerLimit: 0,
        gameId: '1',
      };
      const mockPlanId = '1';

      // Act
      service.createPlan(mockPlan).subscribe((planId) => {
        // Assert
        expect(planId).toEqual(mockPlanId);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/plans`);
      expect(req.request.method).toBe('POST');
      req.flush(mockPlanId);
    });
  });

  describe('updatePlan', () => {
    it('should return an Observable of Uuid', () => {
      // Arrange
      const mockPlanId = '1';
      const mockPlan: UpdatePlan = {
        name: 'Plan 1',
        description: 'Plan 1 description',
        game: '1',
        isPrivate: false,
        playerLimit: 0,
      };
      const mockUpdatedPlanId = '1';

      // Act
      service.updatePlan(mockPlanId, mockPlan).subscribe((updatedPlanId) => {
        // Assert
        expect(updatedPlanId).toEqual(mockUpdatedPlanId);
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/plans/${mockPlanId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockUpdatedPlanId);
    });
  });

  describe('deletePlan', () => {
    it('should return an Observable of void', () => {
      // Arrange
      const mockPlanId = '1';

      // Act
      service.deletePlan(mockPlanId).subscribe((response) => {
        // Assert
        expect(response).toBeUndefined();
      });

      // Assert
      const req = httpMock.expectOne(`${apiBaseUrl}/plans/${mockPlanId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
