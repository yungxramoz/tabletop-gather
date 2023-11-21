import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error.service';

@Component({
  standalone: true,
  selector: 'tg-validation-errors',
  imports: [NgIf, NgFor],
  template: `
    <div class="tg-p-1" *ngIf="!model.pristine && model.errors">
      <p
        class="text-danger"
        *ngFor="
          let error of validationErrorService.friendlyValidationErrors(
            model.errors,
            name
          )
        "
      >
        {{ error }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default, // Explicit, because we usually use OnPush
})
export class ValidationErrorsComponent {
  @Input({ required: true }) public model!: AbstractControl;

  @Input({ required: true }) public name!: string;

  public constructor(
    public readonly validationErrorService: ValidationErrorService
  ) {}
}
