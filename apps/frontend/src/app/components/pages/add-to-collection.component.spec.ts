import {
  AsyncPipe,
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
} from '@angular/common';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  NbIconLibraries,
  NbIconModule,
  NbSpinnerModule,
  NbThemeModule,
} from '@nebular/theme';
import { of } from 'rxjs';
import { GameDto } from '../../models/game/game.dto';
import { GameService } from '../../services/game.service';
import { SearchInputComponent } from '../atoms/search-input.component';
import { GameCardComponent } from '../molecules/game-card.component';
import { AddToCollectionComponent } from './add-to-collection.component';

describe(AddToCollectionComponent.name, () => {
  let fixture: ComponentFixture<AddToCollectionComponent>;
  let component: AddToCollectionComponent;
  let mockGameService: Partial<GameService>;

  beforeEach(async () => {
    mockGameService = {
      getAllGames: jest.fn().mockReturnValue(
        of([
          {
            id: '1',
            name: 'Game 1',
            description: 'Game 1 description',
            minPlayer: 1,
            maxPlayer: 2,
            imageUrl: 'url1',
          },
        ])
      ),
      addGameToCollection: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        NbSpinnerModule,
        NbIconModule,
        NbThemeModule.forRoot(),
        GameCardComponent,
        SearchInputComponent,
        NgForOf,
        NgIf,
        NgClass,
      ],
      providers: [
        { provide: GameService, useValue: mockGameService },
        AsyncPipe,
      ],
    }).compileComponents();

    const iconLibraries: NbIconLibraries = TestBed.inject(NbIconLibraries);
    iconLibraries.registerFontPack('nebular-icons', {
      packClass: 'nebular-icons',
      iconClassPrefix: 'nb',
    });
    iconLibraries.setDefaultPack('nebular-icons');

    fixture = TestBed.createComponent(AddToCollectionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle search input and load games', fakeAsync(() => {
    const searchInput = 'test';
    component.handleSearchInput(searchInput);
    tick(300);
    flush();
    fixture.detectChanges();

    expect(mockGameService.getAllGames).toHaveBeenCalledWith(searchInput, 0);
  }));

  it('should add a game to the collection when action button is clicked', () => {
    const mockGame: GameDto = {
      id: '1',
      name: 'Game 1',
      description: 'Game 1 description',
      minPlayer: 1,
      maxPlayer: 2,
      imageUrl: 'url1',
    };
    component.handleAddToCollection(mockGame);

    expect(mockGameService.addGameToCollection).toHaveBeenCalledWith(
      mockGame.id
    );
  });
});
