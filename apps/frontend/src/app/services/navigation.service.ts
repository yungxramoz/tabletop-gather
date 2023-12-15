import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ROUTE_ADD_TO_COLLECTION,
  ROUTE_COLLECTION,
  ROUTE_EVENTS,
  ROUTE_PLAN_EVENT,
  ROUTE_PROFILE,
  ROUTE_VIEW_EVENT,
} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public constructor(private readonly router: Router) {}

  public back(): void {
    const currentUrl = this.router.url;
    const parentUrl = this.getParentUrl(currentUrl);
    this.router.navigateByUrl(parentUrl);
  }

  public showBackButton(): boolean {
    return !this.isMainFeaturePage();
  }

  private isMainFeaturePage(): boolean {
    return ['', ROUTE_EVENTS, ROUTE_COLLECTION, ROUTE_PROFILE].some(
      (route) => this.router.url == '/' + route
    );
  }

  private getParentUrl(url: string): string {
    if (url.endsWith(ROUTE_PLAN_EVENT) || url.endsWith(ROUTE_VIEW_EVENT)) {
      return `/${ROUTE_EVENTS}`;
    } else if (url.endsWith(ROUTE_ADD_TO_COLLECTION)) {
      return `/${ROUTE_COLLECTION}`;
    }
    return '/';
  }
}
