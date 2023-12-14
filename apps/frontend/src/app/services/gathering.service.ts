import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.config';
import { UpsertGatheringDto } from '../models/gathering/upsert-gathering.dto';
import { ResponseHandler } from '../utils/response.handler';

/**
 * Service for all gathering related API calls.
 */
@Injectable({
  providedIn: 'root',
})
export class GatheringService {
  private readonly gatheringsUrl = `${this.apiBaseUrl}/gatherings`;

  public constructor(
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly http: HttpClient,
    private readonly responseHandler: ResponseHandler
  ) {}

  /**
   * Attend or unattend a list of gatherings.
   * @param {UpsertGatheringDto[]} upsertGatheringDtos - The gatherings to attend or unattend
   * @returns {Observable<unknown>} - The response
   */
  public attendGathering(
    upsertGatheringDtos: UpsertGatheringDto[]
  ): Observable<unknown> {
    return this.http
      .post(`${this.gatheringsUrl}/attend`, upsertGatheringDtos, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        this.responseHandler.handleResponse({
          successMessageOverride: 'Updated your attendance!',
          successTitleOverride: 'That worked 🎉',
        })
      );
  }
}
