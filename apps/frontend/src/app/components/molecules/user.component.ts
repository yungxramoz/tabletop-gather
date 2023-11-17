import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbButtonModule, NbUserModule } from '@nebular/theme';
import { UserDto } from '../../models/user.dto';

@Component({
  selector: 'tg-user',
  standalone: true,
  imports: [CommonModule, NbUserModule, NbButtonModule],
  template: ` <div class="tg-flex-row">
    <nb-user
      [shape]="'semi-round'"
      [name]="user.firstName + ' ' + user.lastName"
      [title]="'Username - ' + user.username"
    >
    </nb-user>
    <p class="caption tg-m-1">{{ user.id }} <i>(uid)</i></p>
    <button
      nbButton
      shape="semi-round"
      size="small"
      (click)="deleteUser.emit(user)"
    >
      Delete
    </button>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input() public user!: UserDto;

  @Output() public deleteUser = new EventEmitter<UserDto>();
}
