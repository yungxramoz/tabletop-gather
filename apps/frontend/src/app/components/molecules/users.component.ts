import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDto } from '../../api/model/user.dto';

@Component({
  selector: 'tabletop-gather-users',
  standalone: true,
  imports: [CommonModule],
  template: ` <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Session User</th>
          <th>Password Hash</th>
          <th>Password Salt</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>{{ user.username }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.sessionUser }}</td>
          <td>{{ user.passwordHash }}</td>
          <td>{{ user.passwordSalt }}</td>
        </tr>
      </tbody>
    </table>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  @Input()
  users: UserDto[] | null = [];
}
