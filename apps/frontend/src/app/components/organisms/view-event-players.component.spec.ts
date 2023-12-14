import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { ViewEventPlayersComponent } from './view-event-players.component';
import { UserCardComponent } from '../molecules/user-card.component';
import { UserPlan } from '../../models/user/user-plan.dto';
import { NbThemeModule } from "@nebular/theme";

describe('ViewEventPlayersComponent', () => {
  let fixture: ComponentFixture<ViewEventPlayersComponent>;
  let component: ViewEventPlayersComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgForOf,
        NgIf,
        NbThemeModule.forRoot(),
        UserCardComponent,
        ViewEventPlayersComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEventPlayersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a UserCardComponent for each attendee', () => {
    const mockAttendees: UserPlan[] = [
      {
        fullName: 'John Doe',
        attendingGatherings: []
      },
      {
        fullName: 'Jane Doe',
        attendingGatherings: []
      },
    ];
    component.attendees = mockAttendees;

    fixture.detectChanges();

    const userCardElements = fixture.nativeElement.querySelectorAll('tg-user-card');
    expect(userCardElements.length).toBe(mockAttendees.length);
  });
});
