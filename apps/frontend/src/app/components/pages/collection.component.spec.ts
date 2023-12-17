import { CommonModule, NgClass, NgIf } from '@angular/common';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  NB_DIALOG_CONFIG,
  NbDialogService,
  NbIconLibraries,
  NbLayoutModule,
  NbSpinnerModule,
  NbThemeModule,
} from '@nebular/theme';
import { of } from 'rxjs';
import { GameDto } from '../../models/game/game.dto';
import { GameService } from '../../services/game.service';
import { CollectionActionsComponent } from '../molecules/collection-actions.component';
import { ViewCollectionOwnComponent } from '../organisms/view-collection-own.component';
import { CollectionComponent } from './collection.component';

describe(CollectionComponent.name, () => {
  let fixture: ComponentFixture<CollectionComponent>;
  let component: CollectionComponent;
  let mockGameService: Partial<GameService>;
  let dialogServiceMock: Partial<NbDialogService>;

  beforeEach(async () => {
    mockGameService = {
      getAllMyGames: jest.fn().mockReturnValue(
        of([
          {
            id: '1',
            name: 'test',
            description: 'test',
            minPlayer: 1,
            maxPlayer: 2,
            imageUrl: 'testurl',
          },
        ])
      ),
      deleteFromCollection: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule.forRoot([]),
        NbLayoutModule,
        NbSpinnerModule,
        NbThemeModule.forRoot(),
        NgIf,
        NgClass,
        CollectionComponent,
        CollectionActionsComponent,
        ViewCollectionOwnComponent,
      ],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: NbDialogService, useClass: dialogServiceMock },
        { provide: NB_DIALOG_CONFIG, useValue: {} },
      ],
    }).compileComponents();

    const iconLibraries: NbIconLibraries = TestBed.inject(NbIconLibraries);
    iconLibraries.registerFontPack('eva', {
      packClass: 'eva',
      iconClassPrefix: 'eva',
    });
    iconLibraries.setDefaultPack('eva');

    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load games on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(mockGameService.getAllMyGames).toHaveBeenCalled();
  }));

  it('should handle search input', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const searchTerm = 'test';
    component.handleSearchInput(searchTerm);
    fixture.detectChanges();
  });

  it('should handle removal of a game from the collection', () => {
    const mockGame: GameDto = {
      id: '1',
      name: 'test',
      description: 'test',
      minPlayer: 1,
      maxPlayer: 2,
      imageUrl: 'testurl',
    };
    component.handleRemoveFromCollection(mockGame);
    fixture.detectChanges();

    expect(mockGameService.deleteFromCollection).toHaveBeenCalledWith(
      mockGame.id
    );
  });
});
