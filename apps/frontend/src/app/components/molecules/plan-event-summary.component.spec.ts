import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { NbButtonModule, NbCardModule, NbThemeModule } from '@nebular/theme';
import { PlanEventSummaryComponent } from './plan-event-summary.component';
import { EventOverviewComponent } from './event-overview.component';
import { LabelComponent } from '../atoms/label.component';
import { LazyImageComponent } from '../atoms/lazy-image.component';
import { VoidComponent } from '../atoms/void.component';
import { PlanEventFormValue } from '../pages/plan-event.component'; // Adjust import paths

describe(PlanEventSummaryComponent.name, () => {
  const mockEvent: PlanEventFormValue = {
    name: 'Test Event',
    game: [
      {
        id: '1',
        name: 'Test Game',
        description: 'Test Description',
        imageUrl: 'https://via.placeholder.com/150',
        minPlayer: 2,
        maxPlayer: 4,
      }
    ],
    description: 'Test Description',
    isPrivate: false,
    playerLimit: '2',
    gatherings: [new Date(2023, 11, 1)]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NbCardModule,
        NbButtonModule,
        NbThemeModule.forRoot(),
        PlanEventSummaryComponent,
        EventOverviewComponent,
        LabelComponent,
        LazyImageComponent,
        VoidComponent
      ],
      providers: [DatePipe]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PlanEventSummaryComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should emit create event', () => {
    const fixture = TestBed.createComponent(PlanEventSummaryComponent);
    const component = fixture.componentInstance;
    component.event = mockEvent;

    jest.spyOn(component.createEvent, 'emit');
    component.createEvent.emit(mockEvent);

    expect(component.createEvent.emit).toHaveBeenCalledWith(mockEvent);
  });
});
