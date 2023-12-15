import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule, NbThemeModule } from '@nebular/theme';
import { UpdateUserFormComponent } from './update-user-form.component';
import { User } from '../../models/user/user.dto';
import { InputComponent } from '../atoms/input.component';
import { CommonModule } from '@angular/common';

describe(UpdateUserFormComponent.name, () => {
  let fixture: ComponentFixture<UpdateUserFormComponent>;
  let component: UpdateUserFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        NbThemeModule.forRoot(),
        UpdateUserFormComponent,
        InputComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update the model on input changes', () => {
    const newUser: User = {
      username: 'newuser',
      firstName: 'New',
      lastName: 'User',
      email: 'newuser@example.com'
    };

    component.user = newUser;
    component.ngOnChanges();

    expect(component.model.username).toBe(newUser.username);
    expect(component.model.firstName).toBe(newUser.firstName);
    expect(component.model.lastName).toBe(newUser.lastName);
    expect(component.model.email).toBe(newUser.email);
  });

  it('should emit user details on update', () => {
    const mockUser: User = {
      username: 'updateduser',
      firstName: 'Updated',
      lastName: 'User',
      email: 'updateduser@example.com'
    };

    jest.spyOn(component.userUpdated, 'emit');

    component.model.username = mockUser.username;
    component.model.firstName = mockUser.firstName;
    component.model.lastName = mockUser.lastName;
    component.model.email = mockUser.email;

    component.updateUser();
    expect(component.userUpdated.emit).toHaveBeenCalledWith(mockUser);
  });
});
