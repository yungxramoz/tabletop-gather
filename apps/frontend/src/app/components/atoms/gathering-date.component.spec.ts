import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GatheringDateComponent } from './gathering-date.component';
import { DateTimeGathering } from '../../models/gathering/date-time-gathering.dto';
import { DetailGathering } from '../../models/gathering/detail-gathering.dto';

describe('GatheringDateComponent', () => {
  let component: GatheringDateComponent;
  let fixture: ComponentFixture<GatheringDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringDateComponent);
    component = fixture.componentInstance;
    component.date = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getDateString', () => {
    it('should format date correctly for Date input', () => {
      const date = new Date(2023, 4, 15);
      expect(component.getDateString(date)).toBe('15.05.2023');
    });

    it('should format date correctly for DetailGathering input', () => {
      const detailGathering: DetailGathering = {
        date: new Date(2023, 11, 13),
        startTime: '14:30',
        participantCount: 4,
      };
      expect(component.getDateString(detailGathering)).toBe('13.12.2023');
    });

    it('should format date correctly for DateTimeGathering input', () => {
      const dateTimeGathering: DateTimeGathering = {
        date: new Date(2023, 11, 13),
        startTime: '14:30',
      };
      expect(component.getDateString(dateTimeGathering)).toBe('13.12.2023');
    });
  });

  describe('getTimeString', () => {
    it('should format time correctly for Date input', () => {
      const date = new Date(2023, 4, 15, 14, 30);
      expect(component.getTimeString(date)).toBe('14:30');
    });

    it('should format time correctly for DateTimeGathering input', () => {
      const dateTimeGathering: DateTimeGathering = {
        date: new Date(2023, 11, 20),
        startTime: '14:30',
      };
      expect(component.getTimeString(dateTimeGathering)).toBe('14:30');
    });
  });
});
