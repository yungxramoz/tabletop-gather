import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  EnvironmentProviders,
  ErrorHandler,
  InjectionToken,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbGlobalPhysicalPosition,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
} from '@nebular/theme';
import { appRoutes } from './app.routes';
import { AuthInterceptor } from './auth/auth.interceptor';
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

const provideNebular = (): EnvironmentProviders[] => [
  importProvidersFrom(NbThemeModule.forRoot({ name: 'tg-theme' })),
  importProvidersFrom(NbSidebarModule.forRoot()),
  importProvidersFrom(NbEvaIconsModule),
  importProvidersFrom(BrowserAnimationsModule), // This is required for Nebular animations to work - not sure why
  importProvidersFrom(
    NbToastrModule.forRoot({
      duration: 3000,
      destroyByClick: true,
      preventDuplicates: true,
      duplicatesBehaviour: 'previous',
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    })
  ),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(HttpClientModule),
    ...provideNebular(),
    provideAuthInterceptor(),
    provideErrorHandler(),
    provideBaseUrlsForDevelopment(),
  ],
};
