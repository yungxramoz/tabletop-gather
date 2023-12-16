import { TestBed } from '@angular/core/testing';
import {
  NbCardModule,
  NbIconModule,
  NbThemeModule,
  NbUserModule,
} from '@nebular/theme';
import { UserPlan } from '../../models/user/user-plan.dto';
import { GatheringDateComponent } from '../atoms/gathering-date.component';
import { UserCardComponent } from './user-card.component';

describe(UserCardComponent.name, () => {
  const mockUser: UserPlan = {
    fullName: 'Test User',
    attendingGatherings: [
      {
        id: '1',
        date: new Date(2023, 11, 1),
        startTime: '18:30',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NbCardModule,
        NbIconModule,
        NbUserModule,
        NbThemeModule.forRoot(),
        UserCardComponent,
        GatheringDateComponent,
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(UserCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render user information', () => {
    const fixture = TestBed.createComponent(UserCardComponent);
    const component = fixture.componentInstance;
    component.user = mockUser;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nb-card-header')?.textContent).toContain(
      mockUser.fullName
    );
  });
});
