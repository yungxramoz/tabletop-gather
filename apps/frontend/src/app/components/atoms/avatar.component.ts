import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Model } from '../../models/model.type';
import { UserDto } from '../../models/user.dto';

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
        box-shadow: 0 0 5rem var(--border-basic-color-4);
        height: 10rem;
        text-align: center;
        width: 10rem;
      }

      .initials {
        line-height: 5;
        position: relative;
        top: calc(10rem / 4); /* 25% of parent */
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() public user!: Model<UserDto>;
}
