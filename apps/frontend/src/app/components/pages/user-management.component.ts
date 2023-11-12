import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Model } from '../../api/model/model.type';
import { UserDto } from '../../api/model/user.dto';
import { UsersService } from '../../api/services/users.service';
import { CreateUserComponent } from '../molecules/create-user.component';
import { UsersComponent } from '../molecules/users.component';

@Component({
  selector: 'tabletop-gather-user-management',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CreateUserComponent, UsersComponent],
  template: ` <div>
    <tabletop-gather-create-user
      (userCreated)="onUserCreated($event)"
    ></tabletop-gather-create-user>
    <tabletop-gather-users [users]="users$ | async"></tabletop-gather-users>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent implements OnInit {
  private readonly usersSubject = new BehaviorSubject<UserDto[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private readonly usersService: UsersService) {}

  onUserCreated(user: Model<UserDto>) {
    this.usersService
      .createUser(user)
      .pipe(switchMap(() => this.usersService.getAllUsers()))
      .subscribe((users) => this.usersSubject.next(users));
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((users) => {
      this.usersSubject.next(users);
    });
  }
}
