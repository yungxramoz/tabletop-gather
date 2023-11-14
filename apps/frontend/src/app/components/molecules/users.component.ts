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
  selector: 'tg-users',
  standalone: true,
  imports: [CommonModule, JsonPipe, NbCardModule, NbListModule, UserComponent],
  template: ` <div>
    <nb-card size="small">
      <nb-card-header>Users</nb-card-header>
      <nb-list>
        <nb-list-item style="display:inline-block;" *ngFor="let user of users">
          <tg-user
            [user]="user"
            (deleteUser)="deleteUser.emit($event)"
          ></tg-user>
        </nb-list-item>
      </nb-list>
    </nb-card>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  @Input() public users: UserDto[] | null = [];

  @Output() public deleteUser = new EventEmitter<UserDto>();
}
