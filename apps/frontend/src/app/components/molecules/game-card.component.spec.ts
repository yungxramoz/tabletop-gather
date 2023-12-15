import {
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { GameOwnersDto } from '../../models/game/game-owners.dto';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { LazyImageComponent } from '../atoms/lazy-image.component';
import { GameCardComponent } from './game-card.component';

describe(GameCardComponent.name, () => {
  const mockGame = {
    name: 'Test Game',
    imageUrl: 'test-url',
    description: 'Test Description',
    owners: ['Test Owner', 'Test Owner 2'],
  } as GameOwnersDto;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        GameCardComponent,
        LazyImageComponent,
        TruncatePipe,
      ],
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
