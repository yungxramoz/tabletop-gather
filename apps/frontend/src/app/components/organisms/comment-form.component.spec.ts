import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbIconModule, NbThemeModule } from '@nebular/theme';
import { TextareaComponent } from '../atoms/textarea.component';
import { CommentFormComponent } from './comment-form.component';

describe(CommentFormComponent.name, () => {
  let fixture: ComponentFixture<CommentFormComponent>;
  let component: CommentFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbThemeModule.forRoot(),
        NbIconModule,
        NbButtonModule,
        TextareaComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
