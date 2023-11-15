import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  InjectionToken,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { AuthInterceptor } from './api/auth.interceptor';
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

const provideAuthInterceptor = (): Provider => ({
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(NbThemeModule.forRoot({ name: 'tg-theme' })),
    importProvidersFrom(NbSidebarModule.forRoot()),
    provideAuthInterceptor(),
    provideErrorHandler(),
    provideBaseUrlsForDevelopment(),
  ],
};
