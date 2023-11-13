import { CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { UserDto } from '../../api/model/user.dto';
import { UserComponent } from '../atoms/user.component';

@Component({
  selector: 'tabletop-gather-users',
  standalone: true,
  imports: [CommonModule, JsonPipe, NbCardModule, NbListModule, UserComponent],
  template: ` <div>
    <nb-card size="small">
      <nb-card-header>Users</nb-card-header>
      <nb-list>
        <nb-list-item style="display:inline-block;" *ngFor="let user of users">
          <tabletop-gather-user
            [user]="user"
            (deleteUser)="deleteUser.emit($event)"
          ></tabletop-gather-user>
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

  @Output()
  deleteUser = new EventEmitter<UserDto>();
}
