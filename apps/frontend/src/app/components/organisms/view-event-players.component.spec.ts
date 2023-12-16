import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbThemeModule } from '@nebular/theme';
import { UserPlan } from '../../models/user/user-plan.dto';
import { UserCardComponent } from '../molecules/user-card.component';
import { ViewEventPlayersComponent } from './view-event-players.component';

describe(ViewEventPlayersComponent.name, () => {
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
        ViewEventPlayersComponent,
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
        attendingGatherings: [],
      },
      {
        fullName: 'Jane Doe',
        attendingGatherings: [],
      },
    ];
    component.attendees = mockAttendees;

    fixture.detectChanges();

    const userCardElements =
      fixture.nativeElement.querySelectorAll('tg-user-card');
    expect(userCardElements.length).toBe(mockAttendees.length);
  });
});
