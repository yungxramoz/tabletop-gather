import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbThemeModule, NbInputModule } from '@nebular/theme';
import { InputComponent } from './input.component';
import { LabelComponent } from './label.component';
import { ValidationErrorsComponent } from './validation-errors.component';

describe(InputComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbThemeModule.forRoot(),
        NbInputModule,
        InputComponent,
        LabelComponent,
        ValidationErrorsComponent
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
