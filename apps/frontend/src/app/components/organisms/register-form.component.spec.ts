import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbThemeModule } from '@nebular/theme';
import { RegisterUser } from '../../models/user/register-user.dto';
import { InputComponent } from '../atoms/input.component';
import { ValidationErrorsComponent } from '../atoms/validation-errors.component';
import { RegisterFormComponent } from './register-form.component';

describe(RegisterFormComponent.name, () => {
  let fixture: ComponentFixture<RegisterFormComponent>;
  let component: RegisterFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NbCardModule,
        NbButtonModule,
        NbThemeModule.forRoot(),
        RegisterFormComponent,
        InputComponent,
        ValidationErrorsComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit user details on form submit', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    const mockUser: RegisterUser = {
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: 'password123',
    };

    jest.spyOn(component.userCreated, 'emit');

    const mockNgForm = {
      valid: true,
      controls: {
        username: { value: mockUser.username },
        firstName: { value: mockUser.firstName },
        lastName: { value: mockUser.lastName },
        email: { value: mockUser.email },
        password: { value: mockUser.password },
        passwordConfirmation: { value: mockUser.password },
      },
      resetForm: jest.fn(), // Mock resetForm method
    } as unknown as NgForm;

    component.createUser(mockNgForm);
    expect(component.userCreated.emit).toHaveBeenCalledWith(mockUser);
    expect(mockNgForm.resetForm).toHaveBeenCalled();
  }));
});
