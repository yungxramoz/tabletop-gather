import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  NbButtonModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
} from '@nebular/theme';
import {
  Observable,
  filter,
  map,
  mergeMap,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { PasswordUpdate } from '../../models/password-update.dto';
import { UserUpdate } from '../../models/user-update.dto';
import { User, UserDto } from '../../models/user.dto';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/user.service';
import { AvatarComponent } from '../atoms/avatar.component';
import {
  DeleteDialogComponent,
  DeleteDialogData,
  DeleteDialogResult,
} from '../organisms/delete-dialog.component';
import {
  PasswordChangeDialogComponent,
  PasswordChangeDialogResult,
} from '../organisms/password-change-dialog.component';
import {
  PasswordDialogComponent,
  PasswordDialogResult,
} from '../organisms/password-dialog.component';
import { UpdateUserFormComponent } from '../organisms/update-user-form.component';

@Component({
  standalone: true,
  selector: 'tg-profile',
  imports: [
    AsyncPipe,
    NgIf,
    NbButtonModule,
    NbDialogModule,
    NbIconModule,
    UpdateUserFormComponent,
    AvatarComponent,
  ],
  template: `
    <ng-container *ngIf="me$ | async as me">
      <div class="tg-flex-row tg-justify-around tg-m-2">
        <tg-avatar [user]="me"></tg-avatar>
      </div>

      <tg-update-user-form
        [user]="me"
        (userUpdated)="onUserUpdated($event)"
      ></tg-update-user-form>

      <button
        nbButton
        fullWidth
        ghost
        status="primary"
        shape="semi-round"
        (click)="changePassword()"
      >
        Change Password
      </button>

      <button
        nbButton
        fullWidth
        ghost
        class="tg-mt-2"
        status="danger"
        shape="semi-round"
        (click)="deleteProfile()"
      >
        <nb-icon icon="trash-2-outline"></nb-icon>
        Delete Profile
      </button>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public me$!: Observable<UserDto>;

  public readonly user = {
    firstName: 'John',
    lastName: 'Doe',
  };

  public constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly dialogService: NbDialogService
  ) {}

  public onUserUpdated(event: Omit<User, 'password'>) {
    this.me$
      .pipe(
        mergeMap((me) =>
          this.dialogService.open(PasswordDialogComponent).onClose.pipe(
            filter((result: PasswordDialogResult) => result !== undefined),
            map((result) => ({ ...me, ...event, ...result } as UserUpdate))
          )
        ),
        switchMap((me) => this.usersService.updateMe(me)),
        tap((jwtDto) => this.authService.updateSession(jwtDto))
      )
      .subscribe();
  }

  public changePassword() {
    this.me$
      .pipe(
        mergeMap((me) =>
          this.dialogService.open(PasswordChangeDialogComponent).onClose.pipe(
            filter(
              (result: PasswordChangeDialogResult) => result !== undefined
            ),
            map(
              (result) =>
                ({
                  email: me.email,
                  password: result.currentPassword,
                  newPassword: result.password,
                } as PasswordUpdate)
            )
          )
        ),
        switchMap((passwordUpdate: PasswordUpdate) =>
          this.usersService.updateMyPassword(passwordUpdate)
        )
      )
      .subscribe();
  }

  public deleteProfile() {
    this.me$
      .pipe(
        mergeMap(() =>
          this.dialogService
            .open(DeleteDialogComponent, {
              context: {
                message: 'Do you really want to delete this profile?',
              } as DeleteDialogData,
            })
            .onClose.pipe(
              filter((result: DeleteDialogResult) => result !== undefined)
            )
        ),
        filter((result) => result.delete),
        switchMap(() => this.usersService.deleteMe()),
        tap(() => this.authService.logout())
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.me$ = this.usersService.me().pipe(
      startWith(undefined),
      shareReplay(1),
      filter((me) => me !== undefined)
    ) as Observable<UserDto>;
  }
}
