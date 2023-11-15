import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  InjectionToken,
  Provider,
  importProvidersFrom,
  ErrorHandler,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { appRoutes } from './app.routes';
import { GlobalErrorHandler } from './utilities/error.handler';

export const API_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  'API_BASE_URL'
);

export const AUTH_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  'AUTH_BASE_URL'
);

const provideBaseUrlsForDevelopment = (): Provider[] => [
  {
    provide: API_BASE_URL,
    useValue: 'http://localhost:8080/api',
  },
  {
    provide: AUTH_BASE_URL,
    useValue: 'http://localhost:8080/auth',
  },
];

const provideErrorHandler = (): Provider => ({
  provide: ErrorHandler,
  useClass: GlobalErrorHandler,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(NbThemeModule.forRoot({ name: 'cosmic' })),
    importProvidersFrom(NbSidebarModule.forRoot()),
    provideBaseUrlsForDevelopment(),
    provideErrorHandler(),
  ],
};
