import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbThemeModule,
} from '@nebular/theme';
import { SearchInputComponent } from '../atoms/search-input.component';
import { CollectionActionsComponent } from './collection-actions.component';

describe(CollectionActionsComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbCardModule,
        NbIconModule,
        NbButtonModule,
        NbActionsModule,
        NbThemeModule.forRoot(),
        RouterTestingModule,
        CollectionActionsComponent,
        SearchInputComponent,
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CollectionActionsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should emit search term', (done) => {
    const fixture = TestBed.createComponent(CollectionActionsComponent);
    const component = fixture.componentInstance;
    const testSearchInput = 'test';

    component.searchTerm.subscribe((emittedValue) => {
      expect(emittedValue).toBe(testSearchInput);
      done();
    });

    component.handleSearchInput(testSearchInput);
  });
});
