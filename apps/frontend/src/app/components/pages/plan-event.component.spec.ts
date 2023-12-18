import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PlanEventComponent } from './plan-event.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlanService } from '../../services/plan.service';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbDatepickerModule, NbStepperModule, NbThemeModule } from '@nebular/theme';
import { DatepickerComponent } from "../molecules/datepicker.component";
import { PlanEventDatesFormComponent } from "../organisms/plan-event-dates-form.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe('PlanEventComponent', () => {
  let fixture: ComponentFixture<PlanEventComponent>;
  let component: PlanEventComponent;
  let mockPlanService: Partial<PlanService>;
  let mockGameService: Partial<GameService>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockPlanService = {
      createPlan: jest.fn().mockReturnValue(of('123')),
    };

    mockGameService = {
      getAllMyGames: jest.fn().mockReturnValue(of([])),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PlanEventComponent,
        PlanEventDatesFormComponent,
        DatepickerComponent,
        FormsModule,
        NbButtonModule,
        NbStepperModule,
        NbDatepickerModule.forRoot(),
        NbThemeModule.forRoot(),
        NoopAnimationsModule
      ],
      providers: [
        { provide: PlanService, useValue: mockPlanService },
        { provide: GameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call GameService to get games on initialization', () => {
    expect(mockGameService.getAllMyGames).toHaveBeenCalled();
  });

  it('should create a plan and navigate to the view event on onCreateEvent', fakeAsync(() => {
    component.onCreateEvent({
      name: 'Test',
      description: 'Test',
      isPrivate: false,
      playerLimit: '10',
      game: [
        {
          id: '123',
          name: 'Test',
          description: 'Test',
          minPlayer: 1,
          maxPlayer: 10,
          imageUrl: 'TestUrl',
        }
      ],
      gatherings: [],
    });
    tick();

    expect(mockPlanService.createPlan).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/view-event', '123']);
  }));
});
