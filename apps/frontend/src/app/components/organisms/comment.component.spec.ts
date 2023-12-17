import { NgIf } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbThemeModule,
} from '@nebular/theme';
import { TextareaComponent } from '../atoms/textarea.component';
import { CommentFormComponent } from './comment-form.component';
import { CommentComponent } from './comment.component';

describe(CommentComponent.name, () => {
  let fixture: ComponentFixture<CommentComponent>;
  let component: CommentComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgIf,
        FormsModule,
        NbThemeModule.forRoot(),
        NbButtonModule,
        NbCardModule,
        NbIconModule,
        NbButtonModule,
        TextareaComponent,
        CommentFormComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
