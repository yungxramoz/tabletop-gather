import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl, FormsModule, NgForm} from '@angular/forms';
import { NbButtonModule, NbCardModule, NbThemeModule } from '@nebular/theme';
import { LoginFormComponent } from './login-form.component';
import { InputComponent } from '../atoms/input.component';

describe('LoginFormComponent', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let component: LoginFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbCardModule,
        NbButtonModule,
        NbThemeModule.forRoot(),
        LoginFormComponent,
        InputComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit credentials on form submit', () => {
    const mockEmailControl = new FormControl('test@example.com');
    const mockPasswordControl = new FormControl('123456');
    const mockForm = {
      value: {
        email: mockEmailControl.value,
        password: mockPasswordControl.value
      },
      controls: {
        email: mockEmailControl,
        password: mockPasswordControl
      }
    } as unknown as NgForm;

    jest.spyOn(component.credentialsCreated, 'emit');

    component.getUser(mockForm);
    expect(component.credentialsCreated.emit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456'
    });
  });
});
