import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NbButtonModule, NbUserModule } from '@nebular/theme';
import { UserDto } from '../../api/model/user.dto';

@Component({
  selector: 'tg-user',
  standalone: true,
  imports: [CommonModule, NbUserModule, NbButtonModule],
  template: ` <div class="row">
    <nb-user
      [shape]="'semi-round'"
      [name]="user.firstName + ' ' + user.lastName"
      [title]="'Username - ' + user.username"
    >
    </nb-user>
    <p class="caption">{{ user.id }} <i>(uid)</i></p>
    <button
      nbButton
      shape="semi-round"
      size="small"
      (click)="deleteUser.emit(user)"
    >
      Delete
    </button>
  </div>`,
  styles: [
    `
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .row > * {
        margin: 0 0.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input()
  user!: UserDto;

  @Output()
  deleteUser = new EventEmitter<UserDto>();
}
