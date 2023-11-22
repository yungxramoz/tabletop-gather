import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import {
  NbButtonModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
} from '@nebular/theme';
import { ValidationErrorsComponent } from '../atoms/validation-errors.component';
import { LabelComponent } from '../atoms/label.component';

@Component({
  standalone: true,
  selector: 'tg-datepicker',
  imports: [
    DatePipe,
    NbInputModule,
    NbButtonModule,
    NbDatepickerModule,
    NbIconModule,
    NbListModule,
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
      type="text"
      [id]="id"
      [placeholder]="placeholder"
      [status]="ngModel.invalid && !ngModel.pristine ? 'danger' : 'basic'"
      (blur)="onBlur()"
      [nbDatepicker]="picker"
    />

    <nb-date-timepicker
      #picker
      [min]="min"
      (dateTimeChange)="onDateTimeChange($event)"
      singleColumn
      [step]="15"
    ></nb-date-timepicker>

    <nb-list fullWidth class="tg-mt-1">
      <nb-list-item
        class="tg-flex-row"
        *ngFor="let selected of value; index as i"
      >
        <p class="tg-medium-weight" p>
          {{ selected | date : 'mediumDate' }} at
          {{ selected | date : 'shortTime' }}
        </p>
        <button
          nbButton
          size="large"
          ghost
          status="danger"
          class="tg-p-0"
          (click)="onSelectedRemove(i)"
        >
          <nb-icon icon="trash-2-outline"></nb-icon>
        </button>
      </nb-list-item>
    </nb-list>

    <tg-validation-errors
      [model]="ngModel.control"
      [name]="label ?? 'This Field'"
    ></tg-validation-errors>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() public label: string | undefined;
  @Input() public placeholder: string | undefined;
  @Input() public min: Date | undefined = new Date();

  public readonly id = `tg-datepicker-${DatepickerComponent.uniqueId++}`;
  public onChange: undefined | ((event: Date[]) => void);
  public onTouched: undefined | (() => void);

  private static uniqueId = 0;

  private _value!: Date[];
  public set value(value: Date[] | undefined) {
    this._value = value ?? [];
  }
  public get value(): Date[] {
    return this._value;
  }

  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public readonly ngModel: NgModel
  ) {
    if (this.ngModel) {
      this.ngModel = ngModel;
      this.ngModel.valueAccessor = this;
    }
  }

  public onDateTimeChange(event: Date) {
    if (
      this.value &&
      this.value.some((value) => this.isEqualDate(value, event))
    )
      return;
    this.value = [...this.value, event];
    if (this.onChange) this.onChange(this.value);
  }

  public onSelectedRemove(index: number) {
    this.value.splice(index, 1);
    if (this.onChange) this.onChange(this.value);
  }

  public onBlur() {
    if (this.onTouched) this.onTouched();
  }

  /** @implement {@see {@link ControlValueAccessor}} */
  public writeValue(value: Date[]) {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  /** @implement {@see {@link ControlValueAccessor}} */
  public registerOnChange(fn: typeof this.onChange) {
    this.onChange = fn;
  }

  /** @implement {@see {@link ControlValueAccessor}} */
  public registerOnTouched(fn: typeof this.onTouched) {
    this.onTouched = fn;
  }

  private isEqualDate(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getHours() === date2.getHours() &&
      date1.getMinutes() === date2.getMinutes()
    );
  }
}
