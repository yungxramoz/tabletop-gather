import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbTabsetModule } from '@nebular/theme';
import { tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'tg-manage-event',
  imports: [NbTabsetModule],
  template: `
    <nb-tabset fullWidth>
      <nb-tab tabTitle="Event"> </nb-tab>
      <nb-tab tabTitle="Players"> </nb-tab>
      <nb-tab tabTitle="Games"> </nb-tab>
    </nb-tabset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageEventComponent {
  public constructor(private readonly route: ActivatedRoute) {
    this.route.params.pipe(tap((params) => console.log(params))).subscribe();
  }
}
