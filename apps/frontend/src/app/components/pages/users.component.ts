import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { BehaviorSubject, switchMap } from 'rxjs';
import { UserDto } from '../../api/model/user.dto';
import { UsersService } from '../../api/services/users.service';
import { RegisterFormComponent } from '../molecules/register-form.component';
import { UserComponent } from '../molecules/user.component';

@Component({
  selector: 'tg-users',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    NbCardModule,
    NbListModule,
    UserComponent,
    RegisterFormComponent,
  ],
  template: `
    <div>
      <nb-card size="small">
        <nb-card-header>Users</nb-card-header>

        <nb-list>
          <nb-list-item
            style="display:inline-block;"
            *ngFor="let user of users$ | async"
            class="tg-mx-2"
          >
            <tg-user [user]="user" (deleteUser)="deleteUser($event)"></tg-user>
          </nb-list-item>
        </nb-list>
      </nb-card>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly usersSubject = new BehaviorSubject<UserDto[]>([]);
  public readonly users$ = this.usersSubject.asObservable();

  public constructor(private readonly usersService: UsersService) {}

  public deleteUser(user: UserDto) {
    if (!confirm(`Are you sure you want to delete ${user.username}?`)) return;

    this.usersService
      .deleteUser(user.id)
      .pipe(switchMap(() => this.usersService.getAllUsers()))
      .subscribe((users) => this.usersSubject.next(users));
  }

  public ngOnInit() {
    this.usersService.getAllUsers().subscribe((users) => {
      this.usersSubject.next(users);
    });
  }
}
