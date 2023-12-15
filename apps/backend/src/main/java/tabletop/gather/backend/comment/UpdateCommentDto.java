package tabletop.gather.backend.comment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCommentDto {
  @NotEmpty(message = "Comment has to be provided")
  @Size(max = 4000, message = "Comment cannot be longer than 4000 characters")
  private String comment;
}
