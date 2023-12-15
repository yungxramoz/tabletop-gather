import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogRef, NbThemeModule } from '@nebular/theme';
import { DeleteDialogComponent } from './delete-dialog.component';
import { InputComponent } from '../atoms/input.component';

describe(DeleteDialogComponent.name, () => {
  let mockDialogRef: Partial<NbDialogRef<DeleteDialogComponent>>;

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
        DeleteDialogComponent,
        InputComponent
      ],
      providers: [
        { provide: NbDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DeleteDialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should close the dialog with delete: true on confirm', () => {
    const fixture = TestBed.createComponent(DeleteDialogComponent);
    const component = fixture.componentInstance;

    component.confirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith({ delete: true });
  });

  it('should close the dialog with delete: false on cancel', () => {
    const fixture = TestBed.createComponent(DeleteDialogComponent);
    const component = fixture.componentInstance;

    component.cancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith({ delete: false });
  });
});
