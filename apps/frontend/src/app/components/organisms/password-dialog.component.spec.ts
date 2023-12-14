import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogRef, NbThemeModule } from '@nebular/theme';
import { PasswordDialogComponent, PasswordDialogResult } from './password-dialog.component';
import { InputComponent } from '../atoms/input.component';

describe('PasswordDialogComponent', () => {
  let mockDialogRef: Partial<NbDialogRef<PasswordDialogComponent>>;

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
        PasswordDialogComponent,
        InputComponent
      ],
      providers: [
        { provide: NbDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PasswordDialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should close the dialog with password data on confirm', () => {
    const fixture = TestBed.createComponent(PasswordDialogComponent);
    const component = fixture.componentInstance;
    const passwordData: PasswordDialogResult = {
      password: 'testPassword'
    };

    component.confirm(passwordData);
    expect(mockDialogRef.close).toHaveBeenCalledWith(passwordData);
  });

  it('should close the dialog without data on cancel', () => {
    const fixture = TestBed.createComponent(PasswordDialogComponent);
    const component = fixture.componentInstance;

    component.cancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
