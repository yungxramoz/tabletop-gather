import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbCheckboxModule } from '@nebular/theme';
import { SelectGatheringComponent } from './select-gathering.component';
import { GatheringDateComponent } from '../atoms/gathering-date.component';
import { DetailPlan } from '../../models/plan/detail-plan.dto';

describe('SelectGatheringComponent', () => {
  const mockGatherings: DetailPlan['gatherings'] = [
    {
      id: '1',
      startTime: '18:00',
      date: new Date(2023, 11, 1),
      participantCount: 4,
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbCheckboxModule,
        SelectGatheringComponent,
        GatheringDateComponent
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SelectGatheringComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
