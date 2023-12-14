import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { UsersService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import {NbDialogService, NbDialogRef, NbThemeModule, NbIconLibraries} from '@nebular/theme';
import { of } from 'rxjs';
import { UserDto } from "../../models/user/user.dto";
import {PasswordDialogComponent} from "../organisms/password-dialog.component";
import {PasswordChangeDialogComponent} from "../organisms/password-change-dialog.component";
import {DeleteDialogComponent} from "../organisms/delete-dialog.component";

// Mock return values for dialog components
const mockDialogRef = {
  onClose: of({}) // Adjust as needed for different scenarios
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let usersService: UsersService;
  let authService: AuthService;
  let dialogService: NbDialogService;

  beforeEach(async () => {
    const usersServiceMock = {
      me: jest.fn().mockReturnValue(of({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@user.com'
      } as UserDto)),
      updateMe: jest.fn().mockReturnValue(of({})),
      updateMyPassword: jest.fn().mockReturnValue(of({})),
      deleteMe: jest.fn().mockReturnValue(of({}))
    };
    const authServiceMock = {
      logout: jest.fn()
    };
    const dialogServiceMock = {
      open: jest.fn().mockReturnValue(mockDialogRef) // Mock the 'open' method
    };

    await TestBed.configureTestingModule({
      imports: [
        NbThemeModule.forRoot(),
        ProfileComponent
      ],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: NbDialogService, useValue: dialogServiceMock }
      ]
    }).compileComponents();

    const iconLibraries: NbIconLibraries = TestBed.inject(NbIconLibraries);
    iconLibraries.registerFontPack('nebular-icons', { packClass: 'nebular-icons', iconClassPrefix: 'nb' });
    iconLibraries.setDefaultPack('nebular-icons');

    usersService = TestBed.inject(UsersService);
    authService = TestBed.inject(AuthService);
    dialogService = TestBed.inject(NbDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle user update correctly', () => {
    const mockUserUpdateData = {
      username: 'testuser1',
      firstName: 'Test1',
      lastName: 'User1',
      email: 'test1@user1.com'
    };
    const mockPasswordData = { password: 'testPassword123' };
    jest.spyOn(dialogService, 'open').mockReturnValue({ onClose: of(mockPasswordData) } as NbDialogRef<any>);

    component.onUserUpdated(mockUserUpdateData);

    expect(dialogService.open).toHaveBeenCalledWith(PasswordDialogComponent);
    expect(usersService.updateMe).toHaveBeenCalledWith({ ...mockUserUpdateData, ...mockPasswordData });
  });

  it('should handle password change correctly', () => {
    const mockPasswordChangeData = { newPassword: 'changedPassword123' };
    jest.spyOn(dialogService, 'open').mockReturnValue({ onClose: of(mockPasswordChangeData) } as NbDialogRef<any>);

    component.changePassword();

    expect(dialogService.open).toHaveBeenCalledWith(PasswordChangeDialogComponent);
    expect(usersService.updateMyPassword).toHaveBeenCalled();
  });

  it('should handle profile deletion correctly', () => {
    const mockDeleteConfirmData = { delete: true }; // Simulate user confirmation
    jest.spyOn(dialogService, 'open').mockReturnValue({ onClose: of(mockDeleteConfirmData) } as NbDialogRef<any>);

    component.deleteProfile();

    expect(dialogService.open).toHaveBeenCalledWith(DeleteDialogComponent, expect.anything());
    expect(usersService.deleteMe).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalled();
  });
});
