import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { delay, of, tap } from 'rxjs';
import { CommentItem } from '../../models/comment/comment-item.dto';
import { TextareaComponent } from '../atoms/textarea.component';

export type CommentFormEvent = {
  comment: CommentItem['comment'];
};

const PLACEHOLDERS = [
  "Hey, I also have a toaster oven I can bring. It's a bit small, but it can fit 2 pizzas at a time.",
  "I'm bringing my Switch too. I have Mario Kart, Smash Bros, and Mario Party.",
  "I'm baking a cake for the party. It's a chocolate cake with vanilla frosting.",
  "Maybe someone can bring some drinks? I'm bringing a 12 pack of Coke.",
  "I'm bringing my dog, Max. He's a German Shepherd and he's super friendly.",
  "I'll bring some homemade guacamole and chips! I make it extra spicy, just how we like it.",
  "Got the music covered! I'll bring my portable speakers and a playlist of all our favorites.",
  "Don't forget dessert! I'll whip up my famous lemon bars.",
  'I can bring some veggie platters and hummus for healthier options.',
  "I'll handle the barbecue. Bringing burgers, hot dogs, and veggie patties.",
  "I can supply some craft beer from the local brewery. A variety for everyone's taste.",
];

@Component({
  standalone: true,
  selector: 'tg-comment-form',
  imports: [FormsModule, NbIconModule, NbButtonModule, TextareaComponent],
  template: `
    <form #commentForm="ngForm" (submit)="submitComment(commentForm)">
      <tg-textarea
        ngModel
        required
        minlength="3"
        maxlength="4000"
        [rows]="4"
        id="comment"
        name="comment"
        [label]="textareaLabel"
        [placeholder]="getPlaceholder()"
      ></tg-textarea>

      <div class="tg-block tg-mt-2">
        <button
          nbButton
          fullWidth
          status="primary"
          shape="semi-round"
          type="submit"
          [disabled]="commentForm.invalid"
        >
          {{ buttonLabel }}
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements AfterViewInit {
  @ViewChild('commentForm') public ngForm!: NgForm;

  @Input({ required: true }) public buttonLabel!: string;
  @Input({ required: true }) public textareaLabel!: string;
  @Input({ required: true }) public comment!: string | null;

  @Output() public commentSubmitted: EventEmitter<CommentFormEvent> =
    new EventEmitter<CommentFormEvent>();

  public submitComment(ngForm: NgForm) {
    this.comment = ngForm.controls['comment'].value;

    this.commentSubmitted.emit({
      comment: ngForm.controls['comment'].value,
    });

    this.ngForm.form.patchValue({ comment: '' }, { emitEvent: false });
    this.ngForm.form.markAsPristine();
  }

  public getPlaceholder(): string {
    return PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];
  }

  public ngAfterViewInit(): void {
    // TODO: Idk why the textarea doesn't update.
    // Well, I know that its writeValue() is being called AFTER ngAfterViewInit with `undefined`.
    // I've had the patchValue call in a setter Method for the comment prop, which didn't work because
    // of this.
    of('')
      .pipe(
        delay(50),
        tap(() => {
          this.ngForm?.form.patchValue(
            { comment: this.comment },
            { emitEvent: false }
          );
        })
      )
      .subscribe();
  }
}
