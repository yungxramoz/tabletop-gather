import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbThemeModule
} from '@nebular/theme';
import { AutocompleteComponent } from './autocomplete.component';
import { LabelComponent } from '../atoms/label.component';
import { LazyImageComponent } from '../atoms/lazy-image.component';
import { ValidationErrorsComponent } from '../atoms/validation-errors.component';

describe(AutocompleteComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbThemeModule.forRoot(),
        NbInputModule,
        NbAutocompleteModule,
        NbButtonModule,
        NbIconModule,
        NbListModule,
        AutocompleteComponent,
        LabelComponent,
        LazyImageComponent,
        ValidationErrorsComponent
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AutocompleteComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should emit searchTerm on input change', () => {
    const fixture = TestBed.createComponent(AutocompleteComponent);
    const component = fixture.componentInstance;
    const mockEvent = { target: { value: 'test' } } as unknown as Event;

    jest.spyOn(component.searchTerm, 'emit');

    component.onInputChange(mockEvent);
    expect(component.searchTerm.emit).toHaveBeenCalledWith('test');
  });

  it('should remove selected item', () => {
    const fixture = TestBed.createComponent(AutocompleteComponent);
    const component = fixture.componentInstance;
    component.value = ['Item1', 'Item2', 'Item3'];

    component.onSelectedRemove(1);
    expect(component.value).toEqual(['Item1', 'Item3']);
  });
});
