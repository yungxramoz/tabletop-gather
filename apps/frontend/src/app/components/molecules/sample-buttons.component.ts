import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

@Component({
  selector: 'tg-sample-buttons',
  standalone: true,
  imports: [CommonModule, NbButtonModule, NbCardModule],
  template: `
    <nb-card>
      <nb-card-header>Buttons</nb-card-header>
      <nb-card-body class="card-body">
        <div>
          <button
            *ngFor="let status of statuses"
            nbButton
            [status]="status"
            class="tg-m-1"
          >
            {{ status }}
          </button>
        </div>
        <div>
          <button
            *ngFor="let status of statuses"
            nbButton
            outline
            [status]="status"
            class="tg-m-1"
          >
            {{ status }}
          </button>
        </div>
        <div>
          <button
            *ngFor="let status of statuses"
            nbButton
            hero
            [status]="status"
            class="tg-m-1"
          >
            {{ status }}
          </button>
        </div>
        <div>
          <button
            *ngFor="let status of statuses"
            nbButton
            ghost
            [status]="status"
            class="tg-m-1"
          >
            {{ status }}
          </button>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleButtonsComponent {
  public readonly statuses = [
    'basic',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
    'control',
  ];
}
