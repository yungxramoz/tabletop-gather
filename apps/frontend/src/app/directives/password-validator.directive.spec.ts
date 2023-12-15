import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormGroup, NgForm } from '@angular/forms';
import { PasswordValidatorDirective } from './password-validator.directive';

describe(PasswordValidatorDirective.name, () => {
  let directive: PasswordValidatorDirective;
  let ngFormMock: Pick<NgForm, 'form'>;

  beforeEach(() => {
    ngFormMock = {
      form: {
        setValidators: jest.fn(),
      } as unknown as FormGroup<object>,
    };

    TestBed.configureTestingModule({
      providers: [
        PasswordValidatorDirective,
        { provide: NgForm, useValue: ngFormMock },
      ],
    });

    directive = TestBed.inject(PasswordValidatorDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe(PasswordValidatorDirective.prototype.validate.name, () => {
    it('should return null if passwords match', () => {
      // Arrange
      const groupMock: Partial<AbstractControl> = {
        get: jest
          .fn()
          .mockReturnValueOnce({ value: 'password' })
          .mockReturnValueOnce({ value: 'password' }),
      };

      // Act
      const result = directive.validate(groupMock as AbstractControl);

      // Assert
      expect(result).toBeNull();
    });

    it('should return a validation error if passwords do not match', () => {
      // Arrange
      const groupMock: Partial<AbstractControl> = {
        get: jest
          .fn()
          .mockReturnValueOnce({ value: 'password' })
          .mockReturnValueOnce({ value: 'differentPassword' }),
      };

      // Act
      const result = directive.validate(groupMock as AbstractControl);

      // Assert
      expect(result).toEqual({ passwordMismatch: true });
    });
  });
});
