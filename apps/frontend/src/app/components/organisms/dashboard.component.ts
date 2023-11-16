import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';

@Component({
  selector: 'tg-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    RouterModule,
  ],
  template: ` <nb-card>
    <nb-card-header>Dashboard</nb-card-header>
    <nb-card-body>
      <p class="tg-m-2">Welcome to the dashboard!</p>
      <button
        nbButton
        status="control"
        [routerLink]="['/design']"
        class="tg-m-2"
      >
        <nb-icon icon="brush-outline"></nb-icon>
        Go To Design
      </button>
      <button
        nbButton
        status="control"
        [routerLink]="['/user-management']"
        class="tg-m-2"
      >
        <nb-icon icon="people-outline"></nb-icon>
        Go To user management
      </button>
    </nb-card-body>
  </nb-card>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
