import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  EnvironmentProviders,
  ErrorHandler,
  InjectionToken,
  Provider,
  importProvidersFrom, isDevMode,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbGlobalPhysicalPosition,
  NbSidebarModule,
  NbThemeModule,
  NbTimepickerModule,
  NbToastrModule,
} from '@nebular/theme';
import { appRoutes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JsonParseInterceptor } from './interceptors/json-parse.interceptor';
import { GlobalErrorHandler } from './utils/global-error-handler';
import { JsonParser } from './utils/json-parser/base.json-parser';
import { DtoJsonParser } from './utils/json-parser/dto.json-parser';
import { provideServiceWorker } from '@angular/service-worker';

export const API_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  'API_BASE_URL'
);

export const AUTH_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  'AUTH_BASE_URL'
);

export const LOCAL_STORAGE: InjectionToken<Storage> =
  new InjectionToken<Storage>('LOCAL_STORAGE');

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

const provideJsonParseInterceptor = (): Provider => ({
  provide: HTTP_INTERCEPTORS,
  useClass: JsonParseInterceptor,
  multi: true,
});

const provideDtoJsonParser = (): Provider => ({
  provide: JsonParser,
  useClass: DtoJsonParser,
});

const provideLocalStorage = (): Provider => ({
  provide: LOCAL_STORAGE,
  useValue: localStorage,
});

const provideNebular = (): EnvironmentProviders[] => [
  importProvidersFrom(NbThemeModule.forRoot({ name: 'tg-theme' })),
  importProvidersFrom(NbSidebarModule.forRoot()),
  importProvidersFrom(NbDatepickerModule.forRoot()),
  importProvidersFrom(NbTimepickerModule.forRoot()),
  importProvidersFrom(NbEvaIconsModule),
  importProvidersFrom(BrowserAnimationsModule), // This is required for Nebular animations to work - not sure why
  importProvidersFrom(
    NbToastrModule.forRoot({
      duration: 10000,
      destroyByClick: true,
      preventDuplicates: true,
      duplicatesBehaviour: 'previous',
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    })
  ),
  importProvidersFrom(
    NbDialogModule.forRoot({
      closeOnBackdropClick: false,
      hasBackdrop: true,
      dialogClass: 'tg-dialog',
    })
  ),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(HttpClientModule),
    ...provideNebular(),
    provideAuthInterceptor(),
    provideJsonParseInterceptor(),
    provideDtoJsonParser(),
    provideErrorHandler(),
    provideBaseUrlsForDevelopment(),
    provideLocalStorage(),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
};
