import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
} from '@nebular/theme';
import { Observable, map, of } from 'rxjs';
import { ValidationErrorsComponent } from '../atoms/validation-errors.component';
import { LabelComponent } from '../atoms/label.component';

@Component({
  standalone: true,
  selector: 'tg-autocomplete',
  imports: [
    AsyncPipe,
    NbInputModule,
    NbAutocompleteModule,
    NbButtonModule,
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
      (input)="onInputChange($event)"
      (blur)="onBlur()"
      [nbAutocomplete]="autoNgModel"
    />

    <nb-autocomplete #autoNgModel (selectedChange)="onSelectedChange($event)">
      <nb-option
        *ngFor="let option of filteredOptions$ | async"
        [value]="option"
        class="tg-basic-bg"
      >
        {{ optionSelector(option) }}
      </nb-option>
    </nb-autocomplete>

    <nb-list fullWidth class="tg-mt-1">
      <nb-list-item
        class="tg-flex-row"
        *ngFor="let selected of value; index as i"
      >
        <p class="tg-medium-weight">{{ optionSelector(selected) }}</p>
        <button
          nbButton
          size="large"
          ghost
          status="danger"
          class="tg-p-0"
          (click)="onSelectedRemove(i)"
        >
          <nb-icon icon="close-outline"></nb-icon>
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
export class AutocompleteComponent<T extends { toString: () => string }>
  implements ControlValueAccessor, OnInit
{
  @Input() public label: string | undefined;
  @Input() public options!: T[];
  @Input() public placeholder: string | undefined;
  @Input() public mode: 'single' | 'multiple' | 'unique' = 'single';
  @Input() public optionSelector: (option: T) => string = (option) =>
    option.toString();

  public readonly id = `tg-autocomplete-${AutocompleteComponent.uniqueId++}`;
  public onChange: undefined | ((event: T[]) => void);
  public onTouched: undefined | (() => void);
  public filteredOptions$!: Observable<T[]>;

  private static uniqueId = 0;

  private _value!: T[];
  public set value(value: T[] | undefined) {
    this._value = value ?? [];
  }
  public get value(): T[] {
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
    if (this.mode === 'unique') {
      if (this.value && this.value.some((value) => value === event)) return;
      this.value = [...this.value, event];
    } else if (this.mode === 'multiple') {
      this.value = [...this.value, event];
    } else {
      this.value = [event];
    }

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
