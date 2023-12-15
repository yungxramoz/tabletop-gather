import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { ValidationErrorsComponent } from './validation-errors.component';
import { ValidationErrorService } from '../../services/validation-error.service';

describe(ValidationErrorsComponent.name, () => {
  let mockValidationErrorService: Partial<ValidationErrorService>;

  beforeEach(async () => {
    mockValidationErrorService = {
      friendlyValidationErrors: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ValidationErrorsComponent],
      providers: [
        { provide: ValidationErrorService, useValue: mockValidationErrorService }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ValidationErrorsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display validation errors', () => {
    const fixture = TestBed.createComponent(ValidationErrorsComponent);
    const component = fixture.componentInstance;
    const mockControl = {
      pristine: false,
      errors: { required: true }
    } as unknown as AbstractControl;

    const mockErrors = ['Required field'];
    (mockValidationErrorService.friendlyValidationErrors as jest.Mock).mockReturnValue(mockErrors);

    component.model = mockControl;
    component.name = 'Test Field';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Required field');
    expect(mockValidationErrorService.friendlyValidationErrors).toHaveBeenCalledWith(mockControl.errors, 'Test Field');
  });
});
