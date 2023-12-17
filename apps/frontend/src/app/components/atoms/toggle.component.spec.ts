import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbThemeModule, NbToggleModule } from '@nebular/theme';
import { LabelComponent } from './label.component';
import { ToggleComponent } from './toggle.component';
import { ValidationErrorsComponent } from './validation-errors.component';

describe(ToggleComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbThemeModule.forRoot(),
        NbToggleModule,
        ToggleComponent,
        LabelComponent,
        ValidationErrorsComponent,
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should handle value change', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    const component = fixture.componentInstance;

    // Simulate value change
    component.valueChange(true);
    expect(component.value).toBe(true);

    // Simulate another value change
    component.valueChange(false);
    expect(component.value).toBe(false);
  });

  it('should handle blur event', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    const component = fixture.componentInstance;

    component.onTouched = jest.fn();

    component.onBlur();
    expect(component.onTouched).toHaveBeenCalled();
  });
});
