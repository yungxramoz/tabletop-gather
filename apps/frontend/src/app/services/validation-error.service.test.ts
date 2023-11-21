import { TestBed } from '@angular/core/testing';
import { ValidationErrorService } from './validation-error.service';

describe(ValidationErrorService.name, () => {
  let service: ValidationErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('friendlyValidationErrors', () => {
    it('should return an array of error messages', () => {
      // Arrange
      const errors = {
        required: true,
        minlength: {
          requiredLength: 5,
          actualLength: 3,
        },
      };
      const fieldName = 'Test Field';

      // Act
      const result = service.friendlyValidationErrors(errors, fieldName);

      // Assert
      expect(result).toEqual([
        'Test Field is required',
        'Test Field must be at least 5 characters',
      ]);
    });

    it('should return an array with default error message if mapping is missing', () => {
      // Arrange
      const errors = {
        customError: true,
      };
      const fieldName = 'Test Field';

      // Act
      const result = service.friendlyValidationErrors(errors, fieldName);

      // Assert
      expect(result).toEqual(['Test Field is invalid']);
    });

    it('should use default field name if fieldName parameter is not provided', () => {
      // Arrange
      const errors = {
        required: true,
      };

      // Act
      const result = service.friendlyValidationErrors(errors);

      // Assert
      expect(result).toEqual(['This field is required']);
    });
  });
});
