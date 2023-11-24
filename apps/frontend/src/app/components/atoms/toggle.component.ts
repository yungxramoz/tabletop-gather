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
import { NbToggleModule } from '@nebular/theme';
import { LabelComponent } from './label.component';
import { ValidationErrorsComponent } from './validation-errors.component';

@Component({
  standalone: true,
  selector: 'tg-toggle',
  imports: [
    NbToggleModule,
    NgIf,
    NgFor,
    ValidationErrorsComponent,
    LabelComponent,
  ],
  template: `
    <tg-label *ngIf="label" [label]="label" [id]="id"></tg-label>

    <nb-toggle
      [id]="id"
      [checked]="value"
      (checkedChange)="valueChange($event)"
      (blur)="onBlur()"
      [status]="ngModel.invalid && !ngModel.pristine ? 'danger' : 'basic'"
    >
      <p class="text-hint">
        {{ description }}
      </p>
    </nb-toggle>

    <tg-validation-errors
      [model]="ngModel.control"
      [name]="label ?? 'This Field'"
    ></tg-validation-errors>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() public label: string | undefined;
  @Input() public description: string | undefined;

  private _value = false;
  public set value(value: boolean) {
    if ((value as unknown) === '' || !value) value = false;
    this._value = value;
  }
  public get value(): boolean {
    return this._value;
  }

  public readonly id = `tg-toggle-${ToggleComponent.uniqueId++}`;
  public onChange: undefined | ((event: boolean) => void);
  public onTouched: undefined | (() => void);

  private static uniqueId = 0;

  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public readonly ngModel: NgModel
  ) {
    if (this.ngModel) {
      this.ngModel.valueAccessor = this;
    }
  }

  public valueChange(event: boolean) {
    this.value = event;
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
