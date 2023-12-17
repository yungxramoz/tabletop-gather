import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbCheckboxModule } from '@nebular/theme';
import { GatheringDatePipe } from '../../pipes/gathering-date.pipe';
import { SelectGatheringComponent } from './select-gathering.component';

describe(SelectGatheringComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbCheckboxModule,
        SelectGatheringComponent,
        GatheringDatePipe,
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SelectGatheringComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
