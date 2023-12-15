import { TestBed } from '@angular/core/testing';
import { NbButtonModule, NbCardModule, NbIconModule, NbThemeModule } from '@nebular/theme';
import { EventCardComponent } from './event-card.component';
import { OverviewPlanDto } from '../../models/plan/overview-plan.dto';
import { TruncatePipe } from '../../pipes/truncate.pipe';

describe(EventCardComponent.name, () => {
  const mockOverviewPlanDto: OverviewPlanDto = {
    id: '1',
    name: 'Test Event',
    description: 'Test Description',
    isPrivate: false,
    ownerName: 'Test Owner',
    playerLimit: 10,
    game: {
      id: '1',
      name: 'Test Game',
      description: 'Test Description',
      minPlayer: 1,
      maxPlayer: 10,
      imageUrl: 'https://via.placeholder.com/150'
    },
    gatheringDates: [new Date(2023, 11, 1)],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        NbThemeModule.forRoot(),
        EventCardComponent,
        TruncatePipe
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(EventCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should emit events correctly', () => {
    const fixture = TestBed.createComponent(EventCardComponent);
    const component = fixture.componentInstance;
    component.overviewPlanDto = mockOverviewPlanDto;

    jest.spyOn(component.cardClicked, 'emit');
    jest.spyOn(component.deleteClicked, 'emit');
    jest.spyOn(component.editClicked, 'emit');

    component.cardClicked.emit();
    expect(component.cardClicked.emit).toHaveBeenCalled();

    component.deleteClicked.emit();
    expect(component.deleteClicked.emit).toHaveBeenCalled();

    component.editClicked.emit();
    expect(component.editClicked.emit).toHaveBeenCalled();
  });
});
