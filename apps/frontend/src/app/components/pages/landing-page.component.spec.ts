import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbThemeModule } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
import { ROUTE_EVENTS, ROUTE_LOGIN } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { LandingPageComponent } from './landing-page.component';

describe(LandingPageComponent.name, () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let router: Router;
  let loginStatus$: BehaviorSubject<boolean>;

  beforeEach(async () => {
    loginStatus$ = new BehaviorSubject<boolean>(false);

    const mockAuthService = {
      loginStatus$: loginStatus$.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [
        NbThemeModule.forRoot(),
        LandingPageComponent,
        RouterTestingModule,
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct router link for Enter button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('ng-reflect-router-link')).toContain(
      ROUTE_LOGIN
    );
  });

  it('should navigate to events page on login', () => {
    loginStatus$.next(true);

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/' + ROUTE_EVENTS]);
  });
});
