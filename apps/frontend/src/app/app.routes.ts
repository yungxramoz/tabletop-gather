import { Route } from '@angular/router';
import { CollectionComponent } from './components/pages/collection.component';
import { EventsComponent } from './components/pages/events.component';
import { FourOhFourComponent } from './components/pages/four-oh-four.component';
import { LandingPageComponent } from './components/pages/landing-page.component';
import { LoginComponent } from './components/pages/login.component';
import { PlanEventComponent } from './components/pages/plan-event.component';
import { ProfileComponent } from './components/pages/profile.component';
import { SampleDesignComponent } from './components/pages/sample-design.component';
import { ViewEventComponent } from './components/pages/view-event.component';
import {
  ROUTE_ADD_TO_COLLECTION,
  ROUTE_COLLECTION,
  ROUTE_DESIGN,
  ROUTE_EVENTS,
  ROUTE_LOGIN,
  ROUTE_PLAN_EVENT,
  ROUTE_PROFILE,
  ROUTE_VIEW_EVENT,
} from './constants';
import { isAuthenticatedOrRedirectToLogin } from './guards/auth.guard';
import {AddToCollectionComponent} from "./components/pages/add-to-collection.component";

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: ROUTE_LOGIN,
    component: LoginComponent,
  },
  {
    path: ROUTE_EVENTS,
    component: EventsComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
  {
    path: ROUTE_PLAN_EVENT,
    component: PlanEventComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
  {
    path: ROUTE_VIEW_EVENT + '/:eventId',
    component: ViewEventComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
  {
    path: ROUTE_COLLECTION,
    component: CollectionComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
  {
    path: ROUTE_ADD_TO_COLLECTION,
    component: AddToCollectionComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
  {
    path: ROUTE_PROFILE,
    component: ProfileComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
  {
    path: ROUTE_DESIGN,
    component: SampleDesignComponent,
    canActivate: [isAuthenticatedOrRedirectToLogin],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: FourOhFourComponent,
  },
];
