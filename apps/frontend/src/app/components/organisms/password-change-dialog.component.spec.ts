import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogRef, NbThemeModule } from '@nebular/theme';
import { PasswordChangeDialogComponent, PasswordChangeDialogResult } from './password-change-dialog.component';
import { InputComponent } from '../atoms/input.component';
import { ValidationErrorsComponent } from '../atoms/validation-errors.component';
import { PasswordValidatorDirective } from '../../directives/password-validator.directive';

describe('PasswordChangeDialogComponent', () => {
  let mockDialogRef: Partial<NbDialogRef<PasswordChangeDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbCardModule,
        NbButtonModule,
        NbThemeModule.forRoot(),
        PasswordChangeDialogComponent,
        InputComponent,
        ValidationErrorsComponent
      ],
      providers: [
        { provide: NbDialogRef, useValue: mockDialogRef },
        PasswordValidatorDirective
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PasswordChangeDialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should close the dialog with password data on confirm', () => {
    const fixture = TestBed.createComponent(PasswordChangeDialogComponent);
    const component = fixture.componentInstance;
    const passwordData: PasswordChangeDialogResult = {
      currentPassword: 'currentPass123',
      password: 'newPass123',
      passwordConfirmation: 'newPass123'
    };

    component.confirm(passwordData);
    expect(mockDialogRef.close).toHaveBeenCalledWith(passwordData);
  });

  it('should close the dialog without data on cancel', () => {
    const fixture = TestBed.createComponent(PasswordChangeDialogComponent);
    const component = fixture.componentInstance;

    component.cancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
