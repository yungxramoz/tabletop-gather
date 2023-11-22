import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MaxValidatorDirective } from './max-validator.directive';

describe(MaxValidatorDirective.name, () => {
  let directive: MaxValidatorDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaxValidatorDirective],
    });

    directive = TestBed.inject(MaxValidatorDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('validate', () => {
    it('should return null if value is less than or equal to tgMaxValidator', () => {
      // Arrange
      directive.tgMaxValidator = 10;
      const control = new FormControl(5);

      // Act
      const result = directive.validate(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should return a validation error if value is greater than tgMaxValidator', () => {
      // Arrange
      directive.tgMaxValidator = 3;
      const control = new FormControl(5);

      // Act
      const result = directive.validate(control);

      // Assert
      expect(result).toEqual({ max: { max: 3 } });
    });

    it('should return null if tgMaxValidator is undefined', () => {
      // Arrange
      directive.tgMaxValidator = undefined;
      const control = new FormControl(10);

      // Act
      const result = directive.validate(control);

      // Assert
      expect(result).toBeNull();
    });
  });
});
