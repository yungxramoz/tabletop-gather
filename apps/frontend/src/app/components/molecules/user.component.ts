import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersService } from '../../api/services/users.service';

@Component({
  selector: 'tabletop-gather-users',
  standalone: true,
  imports: [CommonModule, AsyncPipe, JsonPipe],
  template: ` <div>
    <h2>Users Api Response</h2>
    <ng-container *ngIf="users$ | async as users">
      <pre>{{ users | json }}</pre>
    </ng-container>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  users$ = this.usersService.getAllUsers();

  constructor(private readonly usersService: UsersService) {}
}
