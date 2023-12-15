import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EventsComponent } from './events.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlanService } from '../../services/plan.service';
import { NbDialogService, NbIconLibraries, NbThemeModule } from '@nebular/theme';
import { of } from 'rxjs';
import { ROUTE_VIEW_EVENT } from "../../constants";

describe(EventsComponent.name, () => {
  let fixture: ComponentFixture<EventsComponent>;
  let component: EventsComponent;
  let mockPlanService: Partial<PlanService>;
  let mockDialogService: Partial<NbDialogService>;

  beforeEach(async () => {
    mockPlanService = {
      getAllMyPlans: jest.fn().mockReturnValue(of([])), // Mock data as needed
      getAllPublicPlans: jest.fn().mockReturnValue(of([])),
      getAllAttendingPlans: jest.fn().mockReturnValue(of([])),
      deletePlan: jest.fn().mockReturnValue(of(null)),
    };

    mockDialogService = {
      open: jest.fn().mockReturnValue({ onClose: of({ delete: true }) }), // Mock dialog return value
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: ROUTE_VIEW_EVENT, component: EventsComponent },
        ]),
        NbThemeModule.forRoot(),
        EventsComponent
      ],
      providers: [
        { provide: PlanService, useValue: mockPlanService },
        { provide: NbDialogService, useValue: mockDialogService },
      ],
    }).compileComponents();

    const iconLibraries: NbIconLibraries = TestBed.inject(NbIconLibraries);
    iconLibraries.registerFontPack('nebular-icons', { packClass: 'nebular-icons', iconClassPrefix: 'nb' });
    iconLibraries.setDefaultPack('nebular-icons');

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call PlanService to get plans on initialization', () => {
    expect(mockPlanService.getAllMyPlans).toHaveBeenCalled();
    expect(mockPlanService.getAllPublicPlans).toHaveBeenCalled();
    expect(mockPlanService.getAllAttendingPlans).toHaveBeenCalled();
  });

  // TODO: fix or remove
  /*it('should navigate to view event on viewEvent call', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.viewEvent('123');
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['/' + ROUTE_VIEW_EVENT, '123']);
  }));*/

  it('should open delete dialog and call deletePlan on deleteMyEvent', async () => {
    mockDialogService.open = jest.fn().mockReturnValue({
      onClose: of({ delete: true })
    });

    const deletePlanSpy = jest.spyOn(mockPlanService, 'deletePlan').mockReturnValue(of(undefined));

    await component.deleteMyEvent('123');

    expect(mockDialogService.open).toHaveBeenCalled();
    expect(deletePlanSpy).toHaveBeenCalledWith('123');
  });
});
