import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { Observable } from 'rxjs';
import { filter, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { User, UserDto } from '../../models/user.dto';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { AvatarComponent } from '../atoms/avatar.component';
import { UpdateUserFormComponent } from '../organisms/update-user-form.component';

@Component({
  standalone: true,
  selector: 'tg-profile',
  imports: [
    AsyncPipe,
    NgIf,
    NbButtonModule,
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
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  public onUserUpdated(event: Omit<User, 'email'>) {
    this.me$
      .pipe(
        filter((me) => me !== undefined),
        switchMap((me) => {
          const user = { ...event, email: me!.email } as User;
          return this.usersService.updateUser(me!.id, user);
        })
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.me$ = this.authService.me().pipe(startWith(undefined), shareReplay(1));
  }
}
