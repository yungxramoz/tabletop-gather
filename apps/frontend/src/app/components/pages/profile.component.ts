import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbSpinnerModule,
  NbUserModule,
} from '@nebular/theme';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ROUTE_DESIGN, ROUTE_USER_MANAGEMENT } from '../../constants';
import { UserDto } from '../../models/user.dto';
import { AuthService } from '../../services/auth.service';
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
    NbSpinnerModule,
    RouterModule,
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
        <tg-update-user-form [user]="me"></tg-update-user-form>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-header>Dev Routes</nb-card-header>
      <nb-card-body>
        <button nbButton [routerLink]="[routeDesign]">Design</button>
        <button nbButton class="tg-mx-2" [routerLink]="[routeUserManagement]">
          Users
        </button>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public readonly routeDesign = '/' + ROUTE_DESIGN;
  public readonly routeUserManagement = '/' + ROUTE_USER_MANAGEMENT;
  public me$!: Observable<UserDto | undefined>;

  public readonly user = {
    firstName: 'John',
    lastName: 'Doe',
  };

  public constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.me$ = this.authService.me().pipe(startWith(undefined));
  }
}
