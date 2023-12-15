import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbDatepickerModule, NbThemeModule } from '@nebular/theme';
import { PlanEventDatesFormComponent, PlanEventDatesFormValue } from './plan-event-dates-form.component';
import { DatepickerComponent } from '../molecules/datepicker.component';

describe(PlanEventDatesFormComponent.name, () => {
  let fixture: ComponentFixture<PlanEventDatesFormComponent>;
  let component: PlanEventDatesFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbCardModule,
        NbThemeModule.forRoot(),
        NbDatepickerModule.forRoot(),
        PlanEventDatesFormComponent,
        DatepickerComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanEventDatesFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit form changes', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    const mockFormValue: PlanEventDatesFormValue = {
      gatherings: [new Date()]
    };

    jest.spyOn(component.eventDateFormChange, 'emit');

    component.ngForm.setValue(mockFormValue);
    tick();

    expect(component.eventDateFormChange.emit).toHaveBeenCalledWith(component.ngForm.form);
  }));
});
