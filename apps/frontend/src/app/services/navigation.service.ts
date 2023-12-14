import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  ROUTE_ADD_TO_COLLECTION,
  ROUTE_COLLECTION,
  ROUTE_EVENTS,
  ROUTE_PLAN_EVENT, ROUTE_PROFILE,
  ROUTE_VIEW_EVENT
} from "../constants";

@Injectable({
  providedIn: 'root'
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

  private isMainFeaturePage() {
    return this.router.url === '/' + ROUTE_EVENTS
      || this.router.url === '/' + ROUTE_COLLECTION
      || this.router.url === '/' + ROUTE_PROFILE;
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
