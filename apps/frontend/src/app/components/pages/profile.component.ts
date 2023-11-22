import { Observable } from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbDialogService,
  NbToastrModule,
  NbToastrService,
  NbUserModule,
} from '@nebular/theme';

import { UserUpdate, UserUpdateDto } from '../../models/user-update.dto';
import { User, UserDto } from '../../models/user.dto';
import { UsersService } from '../../services/users.service';
import { AvatarComponent } from '../atoms/avatar.component';
import { UpdateUserFormComponent } from '../organisms/update-user-form.component';
import { PasswordDialogComponent } from '../molecules/password-dialog.component';

@Component({
  standalone: true,
  selector: 'tg-profile',
  imports: [
    AsyncPipe,
    NgIf,
    NbButtonModule,
    NbDialogModule,
    UpdateUserFormComponent,
    AvatarComponent,
  ],
  template: `
    <div *ngIf="me$ | async as me">
      <div class="tg-flex-row tg-justify-around tg-m-4">
        <tg-avatar [user]="me"></tg-avatar>
      </div>
      <tg-update-user-form
        [user]="me"
        (userUpdated)="onUserUpdated($event)"
      ></tg-update-user-form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public me$!: Observable<UserDto | undefined>;

  public readonly user = {
    firstName: 'John',
    lastName: 'Doe',
  };

  public constructor(
    private readonly usersService: UsersService,
    private readonly dialogService: NbDialogService
  ) {}

  public onUserUpdated(event: Omit<User, 'password'>) {
    this.me$
      .pipe(
        filter((me) => me !== undefined),
        mergeMap((me) =>
          this.dialogService.open(PasswordDialogComponent).onClose.pipe(
            filter(
              (password: Pick<UserUpdate, 'password'>) => password !== undefined
            ),
            map((password) => ({ ...me, ...event, ...password } as UserUpdate))
          )
        ),
        tap(console.log),
        switchMap((me) => {
          return this.usersService.updateMe(me);
        })
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.me$ = this.usersService
      .me()
      .pipe(startWith(undefined), shareReplay(1));
  }
}
