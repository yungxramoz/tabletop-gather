import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  InjectionToken,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';

export const API_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  'API_BASE_URL'
);

const provideApiBaseUrlForDevelopment = (): Provider => ({
  provide: API_BASE_URL,
  useValue: 'http://localhost:8080/api',
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(HttpClientModule),
    provideApiBaseUrlForDevelopment(),
  ],
};
