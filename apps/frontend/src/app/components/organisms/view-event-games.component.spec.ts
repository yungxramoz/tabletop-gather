import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbAlertModule } from '@nebular/theme';
import { GameCardComponent } from '../molecules/game-card.component';
import { ViewEventGamesComponent } from './view-event-games.component';

describe(ViewEventGamesComponent.name, () => {
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
        GameCardComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEventGamesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
