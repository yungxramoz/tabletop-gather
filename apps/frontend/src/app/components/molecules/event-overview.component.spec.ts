import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { GameDto } from '../../models/game/game.dto';
import { OverviewPlan } from '../../models/plan/overview-plan.dto';
import { GatheringDatePipe } from '../../pipes/gathering-date.pipe';
import { LabelComponent } from '../atoms/label.component';
import { LazyImageComponent } from '../atoms/lazy-image.component';
import { EventOverviewComponent } from './event-overview.component';

describe(EventOverviewComponent.name, () => {
  const mockGame: GameDto = {
    id: 'test-id',
    name: 'Test Game',
    description: 'Test Description',
    minPlayer: 2,
    maxPlayer: 4,
    imageUrl: 'test-url',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EventOverviewComponent,
        LabelComponent,
        LazyImageComponent,
        GatheringDatePipe,
      ],
      providers: [DatePipe],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(EventOverviewComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should map game from form value correctly', () => {
    const fixture = TestBed.createComponent(EventOverviewComponent);
    const component = fixture.componentInstance;

    expect(component.mapGameFromFormValue(mockGame)).toEqual(mockGame);
  });

  it('should map gatherings from form value correctly', () => {
    const fixture = TestBed.createComponent(EventOverviewComponent);
    const component = fixture.componentInstance;

    const mockPlan: OverviewPlan = {
      name: 'Test Plan',
      description: 'Test Description',
      game: mockGame,
      isPrivate: false,
      playerLimit: 4,
      ownerName: 'Test Owner',
      gatheringDtos: [
        { date: new Date(2023, 11, 1), startTime: '14:30', id: '1' },
      ],
    };
    const gatherings = component.mapGatheringsFromFormValue(mockPlan);
    expect(gatherings).toEqual([new Date(2023, 11, 1)]);
  });
});
