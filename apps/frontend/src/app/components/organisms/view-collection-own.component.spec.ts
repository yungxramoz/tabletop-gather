import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ViewCollectionOwnComponent } from './view-collection-own.component';
import { GameCardComponent } from '../molecules/game-card.component';
import { NgForOf, CommonModule, AsyncPipe } from '@angular/common';
import { NbDialogService, NbThemeModule } from '@nebular/theme';
import { of } from 'rxjs';
import { GameDto } from '../../models/game/game.dto';
import { DeleteDialogComponent } from './delete-dialog.component';

describe(ViewCollectionOwnComponent.name, () => {
  let fixture: ComponentFixture<ViewCollectionOwnComponent>;
  let component: ViewCollectionOwnComponent;
  let dialogServiceMock: Partial<NbDialogService>;

  beforeEach(async () => {
    dialogServiceMock = {
      open: jest.fn().mockReturnValue({
        onClose: of({ delete: true })
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgForOf,
        AsyncPipe,
        NbThemeModule.forRoot(),
        ViewCollectionOwnComponent,
        GameCardComponent
      ],
      providers: [{ provide: NbDialogService, useValue: dialogServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCollectionOwnComponent);
    component = fixture.componentInstance;
    component.games = of([
      {
        name: 'Game 1',
        description: 'Description 1',
        minPlayer: 1,
        maxPlayer: 2,
        imageUrl: 'url1'
      },
      {
        name: 'Game 2',
        description: 'Description 2',
        minPlayer: 2,
        maxPlayer: 4,
        imageUrl: 'url2'
      }
    ]);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteFromCollection when a game is removed', () => {
    jest.spyOn(component.deleteFromCollection, 'emit');

    const mockGame: GameDto = {
      id: '1',
      name: 'Game 1',
      description: 'Description 1',
      minPlayer: 1,
      maxPlayer: 2,
      imageUrl: 'url1'
    };
    component.handleRemoveFromCollection(mockGame);

    expect(dialogServiceMock.open).toHaveBeenCalledWith(DeleteDialogComponent, {
      context: 'Do you really want to remove this game from your collection?'
    });
    expect(component.deleteFromCollection.emit).toHaveBeenCalledWith(mockGame);
  });
});
