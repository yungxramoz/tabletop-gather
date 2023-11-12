import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserManagementComponent } from '../pages/user-management.component';

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe, UserManagementComponent],
  selector: 'tabletop-gather-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'frontend';
}
