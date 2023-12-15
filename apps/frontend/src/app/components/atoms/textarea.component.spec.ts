import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbThemeModule, NbInputModule } from '@nebular/theme';
import { TextareaComponent } from './textarea.component';
import { LabelComponent } from './label.component';
import { ValidationErrorsComponent } from './validation-errors.component';

describe(TextareaComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbThemeModule.forRoot(),
        NbInputModule,
        TextareaComponent,
        LabelComponent,
        ValidationErrorsComponent
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should handle value change', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    const component = fixture.componentInstance;
    const event = new Event('input');
    const target = { value: 'test' };

    Object.defineProperty(event, 'target', { value: target });

    // Simulate value change
    component.valueChange(event);
    expect(component.value).toBe('test');
  });

  it('should handle blur event', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    const component = fixture.componentInstance;

    component.onTouched = jest.fn();

    component.onBlur();
    expect(component.onTouched).toHaveBeenCalled();
  });
});
