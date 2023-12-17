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

/**
 * Service for navigating between pages.
 */
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public constructor(private readonly router: Router) {}

  /**
   * Navigates to the previous page.
   */
  public back(): void {
    const currentUrl = this.router.url;
    const parentUrl = this.getParentUrl(currentUrl);
    this.router.navigateByUrl(parentUrl);
  }

  /**
   * Determines whether the back button should be shown
   * based on the current page.
   *
   * @returns {boolean} Whether the back button should be shown
   */
  public showBackButton(): boolean {
    return !this.isMainFeaturePage();
  }

  /**
   * Determines whether the current page is a main feature page
   * (i.e. the events, collection, or profile page), based on the current url.
   *
   * @returns {boolean} Whether the current page is a main feature page
   */
  private isMainFeaturePage(): boolean {
    return ['', ROUTE_EVENTS, ROUTE_COLLECTION, ROUTE_PROFILE].some(
      (route) => this.router.url == '/' + route
    );
  }

  /**
   * Gets the parent url of the current url.
   *
   * @param {string} url - The current url
   * @returns {string} The parent url
   */
  private getParentUrl(url: string): string {
    if (url.endsWith(ROUTE_PLAN_EVENT) || url.endsWith(ROUTE_VIEW_EVENT)) {
      return `/${ROUTE_EVENTS}`;
    } else if (url.endsWith(ROUTE_ADD_TO_COLLECTION)) {
      return `/${ROUTE_COLLECTION}`;
    }
    return '/';
  }
}
