import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbCardModule, NbListModule, NbUserModule } from '@nebular/theme';
import { UserDto } from '../../api/model/user.dto';

@Component({
  selector: 'tabletop-gather-users',
  standalone: true,
  imports: [CommonModule, JsonPipe, NbCardModule, NbListModule, NbUserModule],
  template: ` <div>
    <nb-card size="small">
      <nb-card-header>Users</nb-card-header>
      <nb-list>
        <nb-list-item style="display:inline-block;" *ngFor="let user of users">
          <nb-user
            [shape]="'semi-round'"
            [name]="user.firstName + ' ' + user.lastName"
            [title]="'Username - ' + user.username"
          >
          </nb-user>
          <p class="caption">{{ user.id }} <i>(uid)</i></p>
        </nb-list-item>
      </nb-list>
    </nb-card>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  @Input()
  users: UserDto[] | null = [];
}
