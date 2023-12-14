import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NgIf, CommonModule, JsonPipe } from '@angular/common';
import { ViewEventGeneralComponent } from './view-event-general.component';
import { NbCardModule, NbThemeModule } from '@nebular/theme';
import { EventOverviewComponent } from '../molecules/event-overview.component';
import { SelectGatheringComponent } from '../molecules/select-gathering.component';
import { DetailPlanDto } from '../../models/plan/detail-plan.dto';

describe('ViewEventGeneralComponent', () => {
  let fixture: ComponentFixture<ViewEventGeneralComponent>;
  let component: ViewEventGeneralComponent;

  const mockDetailPlan: DetailPlanDto = {
    id: '1',
    name: 'Test Event',
    description: 'Test Description',
    game: {
      id: '1',
      name: 'Test Game',
      description: 'Test Description',
      minPlayer: 1,
      maxPlayer: 2,
      imageUrl: 'https://via.placeholder.com/150',
    },
    gatherings: [],
    isPrivate: false,
    owner: {
      id: '1',
      username: 'testuser',
      email: 'test@user.com',
      firstName: 'Test',
      lastName: 'User',
    },
    playerLimit: 5,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgIf,
        JsonPipe,
        NbCardModule,
        NbThemeModule.forRoot(),
        EventOverviewComponent,
        SelectGatheringComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEventGeneralComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display EventOverviewComponent with the provided detailPlan', () => {
    component.detailPlan = mockDetailPlan;

    fixture.detectChanges();

    const eventOverviewElement = fixture.nativeElement.querySelector('tg-event-overview');
    expect(eventOverviewElement).toBeTruthy();
  });

  it('should conditionally display SelectGatheringComponent based on isOwner', () => {
    component.detailPlan = mockDetailPlan;
    component.isOwner = false;

    fixture.detectChanges();

    const selectGatheringElement = fixture.nativeElement.querySelector('tg-select-gathering');
    expect(selectGatheringElement).toBeTruthy();

    component.isOwner = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('tg-select-gathering')).not.toBeNull();
  });
});
