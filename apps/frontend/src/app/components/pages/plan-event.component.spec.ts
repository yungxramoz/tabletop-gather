import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PlanEventComponent, PlanEventFormValue } from './plan-event.component';
import { PlanService } from '../../services/plan.service';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';
import { ROUTE_VIEW_EVENT } from '../../constants';
import { ViewEventComponent } from "./view-event.component";

jest.mock('../../services/plan.service', () => ({
  PlanService: jest.fn().mockImplementation(() => ({
    createPlan: jest.fn().mockReturnValue(of('123'))
  }))
}));

jest.mock('../../services/game.service', () => ({
  GameService: jest.fn().mockImplementation(() => ({
    getAllMyGames: jest.fn().mockReturnValue(of([]))
  }))
}));

// TODO: Fix tests
describe.skip(PlanEventComponent.name, () => {
  let component: PlanEventComponent;
  let fixture: ComponentFixture<PlanEventComponent>;
  let router: Router;
  let planService: PlanService;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: ROUTE_VIEW_EVENT + '/:id', component: ViewEventComponent } // Mock route
        ]),
        PlanEventComponent
      ],
      providers: [PlanService, GameService]
    }).compileComponents();

    router = TestBed.inject(Router);
    planService = TestBed.inject(PlanService);
    gameService = TestBed.inject(GameService);

    jest.spyOn(router, 'navigate');
    jest.spyOn(planService, 'createPlan').mockReturnValue(of('123')); // Spy on the method
    jest.spyOn(gameService, 'getAllMyGames').mockReturnValue(of([])); // Spy on the method
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to view event on successful plan creation', () => {
    const mockPlanEventFormValue: PlanEventFormValue = {
      name: 'Test',
      description: 'Test',
      isPrivate: false,
      playerLimit: '10',
      game: [
        {
          id: '1',
          name: 'Test',
          description: 'Test',
          minPlayer: 1,
          maxPlayer: 10,
          imageUrl: 'TestUrl',
        }
      ],
      gatherings: [new Date(2023, 11, 1)]
    };
    component.onCreateEvent(mockPlanEventFormValue);

    expect(planService.createPlan).toHaveBeenCalledWith(expect.anything());
    expect(router.navigate).toHaveBeenCalledWith([`/${ROUTE_VIEW_EVENT}`, '123']);
  });
});
