import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgModel,
  ValidationErrors,
} from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import { Observable, map, of } from 'rxjs';
import {
  VALIDATION_ERROR_MAPPING_OVERRIDE,
  ValidationErrorMappingOverride,
  friendlyValidationErrors,
} from '../../resources/validation-errors.resources';

@Component({
  standalone: true,
  selector: 'tg-autocomplete',
  imports: [
    AsyncPipe,
    NbInputModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbIconModule,
    NgIf,
    NgFor,
  ],
  template: `
    <div class="tg-p-1" *ngIf="label">
      <label class="label" [for]="id">{{ label }}</label>
    </div>
    <input
      nbInput
      fullWidth
      shape="semi-round"
      type="text"
      [id]="id"
      [placeholder]="placeholder"
      [status]="ngModel.invalid && !ngModel.pristine ? 'danger' : 'basic'"
      (input)="onInputChange($event)"
      (blur)="onBlur()"
      [nbAutocomplete]="autoNgModel"
    />

    <nb-autocomplete #autoNgModel (selectedChange)="onSelectedChange($event)">
      <nb-option
        *ngFor="let option of filteredOptions$ | async"
        [value]="option"
      >
        {{ optionSelector(option) }}
      </nb-option>
    </nb-autocomplete>

    <div class="tg-flex-row" *ngFor="let selected of value; index as i">
      <p>{{ optionSelector(selected) }}</p>
      <button nbButton ghost status="danger" (click)="onSelectedRemove(i)">
        <nb-icon icon="close-outline"></nb-icon>
      </button>
    </div>

    <div class="tg-p-1" *ngIf="!ngModel.pristine && ngModel.errors">
      <p class="text-danger" *ngFor="let error of getErrors(ngModel.errors)">
        {{ error }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent<T extends { toString: () => string }>
  implements ControlValueAccessor, OnInit
{
  @Input() public label: string | undefined;
  @Input() public options!: T[];
  @Input() public optionSelector: (option: T) => string = (option) =>
    option.toString();
  @Input() public placeholder: string | undefined;

  public readonly id = `tg-autocomplete-${AutocompleteComponent.uniqueId++}`;
  public onChange: undefined | ((event: T[]) => void);
  public onTouched: undefined | (() => void);
  public filteredOptions$!: Observable<T[]>;

  private static uniqueId = 0;

  private _value!: T[];
  public set value(value: T[]) {
    this._value = value;
  }
  public get value(): T[] {
    return this._value;
  }

  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public readonly ngModel: NgModel,
    @Inject(VALIDATION_ERROR_MAPPING_OVERRIDE)
    @Optional()
    public readonly validationErrorMappingOverride: ValidationErrorMappingOverride
  ) {
    if (this.ngModel) {
      this.ngModel = ngModel;
      this.ngModel.valueAccessor = this;
    }
  }

  public getErrors(errors: ValidationErrors) {
    return friendlyValidationErrors(
      errors,
      this.label ?? 'This field',
      this.validationErrorMappingOverride
    );
  }

  public onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredOptions$ = of(this.options).pipe(
      map((options) =>
        options.filter((option) =>
          this.optionSelector(option).includes(inputValue)
        )
      )
    );
    if (this.onChange) this.onChange(this.value);
  }

  public onSelectedChange(event: T) {
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
  public writeValue(value: T[]) {
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

  public ngOnInit() {
    this.filteredOptions$ = of(this.options);
  }
}
