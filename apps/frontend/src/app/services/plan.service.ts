import { filter, map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { API_BASE_URL } from '../app.config';
import { CreatePlan } from '../models/plan/create-plan.dto';
import { DetailPlanDto } from '../models/plan/detail-plan.dto';
import { OverviewPlanDto } from '../models/plan/overview-plan.dto';
import { UpdatePlan } from '../models/plan/update-plan.dto';
import { ResponseHandler } from '../utils/response.handler';
import { Uuid } from '../utils/types';

/**
 * Service for all plan related API calls.
 */
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private readonly plansUrl = `${this.apiBaseUrl}/plans`;

  public constructor(
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly http: HttpClient,
    private readonly responseHandler: ResponseHandler
  ) {}

  /**
   * Gets all public plans.
   *
   * @returns {Observable<OverviewPlanDto[]>} - The plans
   */
  public getAllPublicPlans(): Observable<OverviewPlanDto[]> {
    return this.http
      .get<object[]>(this.plansUrl, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        filter((response) => response !== null),
        map((response) => response?.body as object[]),
        map((overviewPlansJson) =>
          overviewPlansJson.map((plan: unknown) =>
            OverviewPlanDto.fromJson(plan)
          )
        )
      );
  }

  /**
   * Gets all my plans.
   *
   * @returns {Observable<OverviewPlanDto[]>} - The plans
   */
  public getAllMyPlans(): Observable<OverviewPlanDto[]> {
    return this.http
      .get<object[]>(`${this.plansUrl}/me`, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        filter((response) => response !== null),
        map((response) => response?.body as object[]),
        map((overviewPlansJson) =>
          overviewPlansJson.map((plan: unknown) =>
            OverviewPlanDto.fromJson(plan)
          )
        )
      );
  }

  /**
   * Gets all plans the current user is attending.
   *
   * @returns {Observable<OverviewPlanDto[]>} - The plans
   */
  public getAllAttendingPlans(): Observable<OverviewPlanDto[]> {
    return this.http
      .get<object[]>(`${this.plansUrl}/attending`, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        filter((response) => response !== null),
        map((response) => response?.body as object[]),
        map((overviewPlansJson) =>
          overviewPlansJson.map((plan: unknown) =>
            OverviewPlanDto.fromJson(plan)
          )
        )
      );
  }

  /**
   * Gets a plan by id.
   *
   * @param {Uuid} id - The id of the plan
   * @returns {Observable<DetailPlanDto>} - The detailed plan
   */
  public getPlanById(id: Uuid): Observable<DetailPlanDto> {
    return this.http
      .get<object>(`${this.plansUrl}/${id}`, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleErrorResponse(),
        filter((response) => response !== null),
        map((response) => response?.body as object),
        map((detailPlanJson) => DetailPlanDto.fromJson(detailPlanJson))
      );
  }

  /**
   * Creates a new plan.
   *
   * @param {CreatePlan} plan - The plan to create
   * @returns {Observable<Uuid>} - The id of the created plan
   */
  public createPlan(plan: CreatePlan): Observable<Uuid> {
    return this.http
      .post(`${this.plansUrl}`, plan, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride: `Plan was created successfully`,
          successTitleOverride: 'Plan created 👍',
        }),
        filter((response) => response !== null),
        map((response) => JSON.parse(response?.body as Uuid))
      );
  }

  /**
   * Updates a plan.
   *
   * @param {Uuid} id - The id of the plan
   * @param {UpdatePlan} plan - The plan to update
   * @returns {Observable<Uuid>} - The id of the updated plan
   */
  public updatePlan(id: Uuid, plan: UpdatePlan): Observable<Uuid> {
    return this.http
      .put(`${this.plansUrl}/${id}`, plan, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride: `Plan was updated successfully`,
          successTitleOverride: 'Plan updated 👍',
        }),
        filter((response) => response !== null),
        map((response) => JSON.parse(response?.body as Uuid))
      );
  }

  /**
   * Deletes a plan.
   *
   * @param {Uuid} id - The id of the plan
   * @returns {Observable<void>}
   */
  public deletePlan(id: Uuid): Observable<void> {
    return this.http
      .delete(`${this.plansUrl}/${id}`, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride: `Plan was deleted successfully`,
          successTitleOverride: 'Plan deleted 👊',
        }),
        filter((response) => response !== null),
        map((response) => response?.body as void)
      );
  }
}
