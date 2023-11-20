import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgModel,
  ValidationErrors,
} from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { friendlyValidationErrors } from '../../resources/validation-errors.resources';

@Component({
  standalone: true,
  selector: 'tg-textarea',
  imports: [NbInputModule, NgIf, NgFor],
  template: `
    <div class="tg-p-1" *ngIf="label">
      <label class="label" [for]="id">{{ label }}</label>
    </div>
    <textarea
      nbInput
      fullWidth
      shape="semi-round"
      [id]="id"
      [value]="value"
      [rows]="rows"
      (input)="valueChange($event)"
      (blur)="onBlur()"
      [placeholder]="placeholder"
      [status]="ngModel.invalid && !ngModel.pristine ? 'danger' : 'basic'"
      class="tg-resize-vertical"
    ></textarea>
    <div class="tg-p-1" *ngIf="!ngModel.pristine && ngModel.errors">
      <p class="text-danger" *ngFor="let error of getErrors(ngModel.errors)">
        {{ error }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() public label: string | undefined;
  @Input() public placeholder: string | undefined;
  @Input() public rows: number | undefined;

  private _value!: string | number;
  public set value(value: string | number) {
    this._value = value;
  }

  public get value(): string | number {
    return this._value;
  }

  public readonly id = `tg-textarea-${TextareaComponent.uniqueId++}`;
  public onChange: undefined | ((event: string | number) => void);
  public onTouched: undefined | (() => void);

  private static uniqueId = 0;

  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public readonly ngModel: NgModel
  ) {
    if (this.ngModel) {
      this.ngModel = ngModel;
      this.ngModel.valueAccessor = this;
    }
  }

  public valueChange(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
    if (this.onChange) this.onChange(this.value);
  }

  public onBlur() {
    if (this.onTouched) this.onTouched();
  }

  public getErrors(errors: ValidationErrors) {
    return friendlyValidationErrors(errors, this.label ?? 'This field');
  }

  public writeValue(value: typeof this.value) {
    this.value = value;
    if (this.changeDetectorRef) {
      this.changeDetectorRef.markForCheck();
    }
  }

  public registerOnChange(fn: typeof this.onChange) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: typeof this.onTouched) {
    this.onTouched = fn;
  }
}
