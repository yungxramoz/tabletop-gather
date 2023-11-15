import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Model } from '../../api/model/model.type';
import { UserDto } from '../../api/model/user.dto';
import { UsersService } from '../../api/services/users.service';
import { RegisterComponent } from '../molecules/register.component';
import { UsersComponent } from '../molecules/users.component';

@Component({
  selector: 'tg-user-management',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RegisterComponent, UsersComponent],
  template: `
    <tg-users
      header="Users"
      [users]="users$ | async"
      (deleteUser)="deleteUser($event)"
    ></tg-users>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent implements OnInit {
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
