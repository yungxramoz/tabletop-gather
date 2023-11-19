import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbButtonModule, NbCardModule, NbUserModule } from '@nebular/theme';
import { Observable } from 'rxjs';
import { filter, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Model } from '../../models/model.type';
import { UserDto } from '../../models/user.dto';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { UpdateUserFormComponent } from '../molecules/update-user-form.component';

@Component({
  standalone: true,
  selector: 'tg-profile',
  imports: [
    AsyncPipe,
    NgIf,
    NbCardModule,
    NbButtonModule,
    NbUserModule,
    UpdateUserFormComponent,
  ],
  template: `
    <nb-card>
      <nb-card-header>Profile</nb-card-header>
      <nb-card-body *ngIf="me$ | async as me">
        <div class="tg-flex-row tg-justify-around tg-m-2">
          <nb-user
            [shape]="'round'"
            [name]="me.firstName + ' ' + me.lastName"
            size="giant"
            onlyPicture
          >
          </nb-user>
        </div>
        <tg-update-user-form
          [user]="me"
          (userUpdated)="onUserUpdated($event)"
        ></tg-update-user-form>
      </nb-card-body>
    </nb-card>
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

  public onUserUpdated(event: Model<Omit<UserDto, 'email'>>) {
    this.me$
      .pipe(
        filter((me) => me !== undefined),
        switchMap((me) => {
          const user = { ...event, email: me!.email } as Model<UserDto>;
          return this.usersService.updateUser(me!.id, user);
        })
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.me$ = this.authService.me().pipe(startWith(undefined), shareReplay(1));
  }
}
