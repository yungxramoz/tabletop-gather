import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { ValidationErrorsComponent } from './validation-errors.component';
import { LabelComponent } from './label.component';

@Component({
  standalone: true,
  selector: 'tg-input',
  imports: [
    NbInputModule,
    NgIf,
    NgFor,
    ValidationErrorsComponent,
    LabelComponent,
  ],
  template: `
    <tg-label *ngIf="label" [label]="label" [id]="id"></tg-label>

    <input
      nbInput
      fullWidth
      shape="semi-round"
      [type]="type"
      [id]="id"
      [value]="value"
      (input)="valueChange($event)"
      (blur)="onBlur()"
      [placeholder]="placeholder"
      [status]="ngModel.invalid && !ngModel.pristine ? 'danger' : 'basic'"
    />

    <tg-validation-errors
      [model]="ngModel.control"
      [name]="label ?? 'This Field'"
    ></tg-validation-errors>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() public label: string | undefined;
  @Input() public type: 'text' | 'number' | 'password' = 'text';
  @Input() public placeholder: string | undefined;

  private _value!: string | number;
  public set value(value: string | number) {
    this._value = value;
  }

  public get value(): string | number {
    return this._value;
  }

  public readonly id = `tg-input-${InputComponent.uniqueId++}`;
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
    this.value = (event.target as HTMLInputElement).value;
    if (this.onChange) this.onChange(this.value);
  }

  public onBlur() {
    if (this.onTouched) this.onTouched();
  }

  /** @implement {@see {@link ControlValueAccessor}} */
  public writeValue(value: typeof this.value) {
    this.value = value;
    if (this.changeDetectorRef) {
      this.changeDetectorRef.markForCheck();
    }
  }

  /** @implement {@see {@link ControlValueAccessor}} */
  public registerOnChange(fn: typeof this.onChange) {
    this.onChange = fn;
  }

  /** @implement {@see {@link ControlValueAccessor}} */
  public registerOnTouched(fn: typeof this.onTouched) {
    this.onTouched = fn;
  }
}
