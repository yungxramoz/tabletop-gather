import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

@Component({
  selector: 'tabletop-gather-sample-buttons',
  standalone: true,
  imports: [CommonModule, NbButtonModule, NbCardModule],
  template: `
    <nb-card>
      <nb-card-header>Buttons</nb-card-header>
      <nb-card-body class="card-body">
        <div class="row">
          <button *ngFor="let status of statuses" nbButton [status]="status">
            {{ status }}
          </button>
        </div>
        <div class="row">
          <button
            *ngFor="let status of statuses"
            nbButton
            outline
            [status]="status"
          >
            {{ status }}
          </button>
        </div>
        <div class="row">
          <button
            *ngFor="let status of statuses"
            nbButton
            hero
            [status]="status"
          >
            {{ status }}
          </button>
        </div>
        <div class="row">
          <button
            *ngFor="let status of statuses"
            nbButton
            ghost
            [status]="status"
          >
            {{ status }}
          </button>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  styles: [
    `
      .card-body {
        display: flex;
        flex-direction: column;
      }
      .row > * {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class SampleButtonsComponent {
  public statuses = [
    'basic',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
    'control',
  ];
}
