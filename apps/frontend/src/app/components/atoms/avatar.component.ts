import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../models/user.dto';

@Component({
  standalone: true,
  selector: 'tg-avatar',
  template: `
    <div class="circle">
      <span class="initials"
        >{{ user.firstName[0].toUpperCase()
        }}{{ user.lastName[0].toUpperCase() }}</span
      >
    </div>
  `,
  styles: [
    `
      .circle {
        background-color: transparent;
        border-radius: 50%;
        border: 1px solid var(--color-control-default);
        box-shadow: 0 0 3rem var(--border-basic-color-4);
        height: 8rem;
        text-align: center;
        width: 8rem;
      }

      .initials {
        line-height: 4;
        position: relative;
        top: calc(8rem / 4); /* 25% of parent */
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() public user!: User;
}
