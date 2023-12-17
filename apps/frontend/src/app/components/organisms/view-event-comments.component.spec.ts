import { NgFor, NgIf } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCardModule, NbDialogService, NbThemeModule } from '@nebular/theme';
import { of } from 'rxjs';
import { InputComponent } from '../atoms/input.component';
import { VoidComponent } from '../atoms/void.component';
import { CommentFormComponent } from './comment-form.component';
import { CommentComponent } from './comment.component';
import { ViewEventCommentsComponent } from './view-event-comments.component';

describe(ViewEventCommentsComponent.name, () => {
  let fixture: ComponentFixture<ViewEventCommentsComponent>;
  let component: ViewEventCommentsComponent;
  let dialogServiceMock: Partial<NbDialogService>;

  beforeEach(async () => {
    dialogServiceMock = {
      open: jest.fn().mockReturnValue({
        onClose: of({ delete: true }),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        NgFor,
        NgIf,
        ViewEventCommentsComponent,
        CommentComponent,
        InputComponent,
        NbThemeModule.forRoot(),
        NbCardModule,
        VoidComponent,
        CommentFormComponent,
      ],
      providers: [{ provide: NbDialogService, useValue: dialogServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEventCommentsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
