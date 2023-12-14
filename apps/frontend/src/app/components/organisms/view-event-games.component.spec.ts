import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { ViewEventGamesComponent } from './view-event-games.component';
import { GameCardComponent } from '../molecules/game-card.component';
import { NbAlertModule } from '@nebular/theme';

describe('ViewEventGamesComponent', () => {
  let fixture: ComponentFixture<ViewEventGamesComponent>;
  let component: ViewEventGamesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgForOf,
        NgIf,
        NbAlertModule,
        ViewEventGamesComponent,
        GameCardComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEventGamesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Add more tests
});
