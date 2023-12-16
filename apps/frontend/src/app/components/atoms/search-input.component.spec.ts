import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbInputModule, NbThemeModule } from '@nebular/theme';
import { LabelComponent } from './label.component';
import { SearchInputComponent } from './search-input.component';
import { ValidationErrorsComponent } from './validation-errors.component';

describe(SearchInputComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbThemeModule.forRoot(),
        NbInputModule,
        SearchInputComponent,
        LabelComponent,
        ValidationErrorsComponent,
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SearchInputComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
