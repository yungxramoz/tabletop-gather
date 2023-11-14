import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Model } from '../../api/model/model.type';
import { UserDto } from '../../api/model/user.dto';
import { UsersService } from '../../api/services/users.service';
import { CreateUserComponent } from '../molecules/create-user.component';
import { UsersComponent } from '../molecules/users.component';

@Component({
  selector: 'tg-user-management',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CreateUserComponent, UsersComponent],
  template: ` <div>
    <tg-users
      [users]="users$ | async"
      (deleteUser)="deleteUser($event)"
    ></tg-users>
    <tg-create-user (userCreated)="onUserCreated($event)"></tg-create-user>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent implements OnInit {
  private readonly usersSubject = new BehaviorSubject<UserDto[]>([]);
  public readonly users$ = this.usersSubject.asObservable();

  public constructor(private readonly usersService: UsersService) {}

  public onUserCreated(user: Model<UserDto>) {
    this.usersService
      .createUser(user)
      .pipe(switchMap(() => this.usersService.getAllUsers()))
      .subscribe((users) => this.usersSubject.next(users));
  }

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
