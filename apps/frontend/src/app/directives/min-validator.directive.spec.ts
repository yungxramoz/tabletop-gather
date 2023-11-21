import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MinValidatorDirective } from './min-validator.directive';

describe(MinValidatorDirective.name, () => {
  let directive: MinValidatorDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MinValidatorDirective],
    });

    directive = TestBed.inject(MinValidatorDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('validate', () => {
    it('should return null if value is greater than or equal to tgMinValidator', () => {
      // Arrange
      directive.tgMinValidator = 5;
      const control = new FormControl(10);

      // Act
      const result = directive.validate(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should return a validation error if value is less than tgMinValidator', () => {
      // Arrange
      directive.tgMinValidator = 5;
      const control = new FormControl(3);

      // Act
      const result = directive.validate(control);

      // Assert
      expect(result).toEqual({ min: { min: 5 } });
    });

    it('should return null if tgMinValidator is undefined', () => {
      // Arrange
      directive.tgMinValidator = undefined;
      const control = new FormControl(10);

      // Act
      const result = directive.validate(control);

      // Assert
      expect(result).toBeNull();
    });
  });
});
