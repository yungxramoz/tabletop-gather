import {TestBed, fakeAsync, tick, discardPeriodicTasks} from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { LazyImageComponent } from '../atoms/lazy-image.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { GamePlan } from '../../models/game/game-plan.dto';

describe(GameCardComponent.name, () => {
  const mockGame: GamePlan = {
    name: 'Test Game',
    imageUrl: 'test-url',
    description: 'Test Description',
    owners: ['Test Owner', 'Test Owner 2']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        GameCardComponent,
        LazyImageComponent,
        TruncatePipe
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(GameCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should handle action button click', () => {
    const fixture = TestBed.createComponent(GameCardComponent);
    const component = fixture.componentInstance;
    component.game = mockGame;

    jest.spyOn(component.actionButtonClicked, 'emit');
    component.onActionButtonClicked();

    expect(component.actionButtonClicked.emit).toHaveBeenCalledWith(mockGame);
  });

  it('should toggle flipped state', fakeAsync(() => {
    const fixture = TestBed.createComponent(GameCardComponent);
    const component = fixture.componentInstance;

    component.toggle();

    tick(300 * 2);
    discardPeriodicTasks();
  }));
});
