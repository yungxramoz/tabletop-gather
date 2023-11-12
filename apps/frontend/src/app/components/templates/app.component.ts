import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateUserComponent } from '../molecules/create-user.component';
import { UsersComponent } from '../molecules/user.component';

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe, UsersComponent, CreateUserComponent],
  selector: 'tabletop-gather-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'frontend';
}
