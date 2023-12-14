import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  NB_DATE_ADAPTER,
  NbButtonModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbNativeDateService,
  NbThemeModule
} from '@nebular/theme';
import { DatepickerComponent } from './datepicker.component';
import { GatheringDateComponent } from '../atoms/gathering-date.component';
import { LabelComponent } from '../atoms/label.component';
import { ValidationErrorsComponent } from '../atoms/validation-errors.component';

describe('DatepickerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbInputModule,
        NbButtonModule,
        NbDatepickerModule,
        NbIconModule,
        NbListModule,
        NbThemeModule.forRoot(),
        DatepickerComponent,
        LabelComponent,
        ValidationErrorsComponent,
        GatheringDateComponent
      ],
      providers: [
        { provide: NB_DATE_ADAPTER, useClass: NbNativeDateService },
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DatepickerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should handle date change', () => {
    const fixture = TestBed.createComponent(DatepickerComponent);
    const component = fixture.componentInstance;

    component.value = [];

    const mockDate = new Date();
    component.onDateTimeChange(mockDate);

    expect(component.value).toContain(mockDate);
  });


  it('should remove a selected date', () => {
    const fixture = TestBed.createComponent(DatepickerComponent);
    const component = fixture.componentInstance;
    const mockDate1 = new Date(2023, 11, 1);
    const mockDate2 = new Date(2023, 11, 2);
    component.value = [mockDate1, mockDate2];

    component.onSelectedRemove(0);
    expect(component.value).not.toContain(mockDate1);
  });
});
