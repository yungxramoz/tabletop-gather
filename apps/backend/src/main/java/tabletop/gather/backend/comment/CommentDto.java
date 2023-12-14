package tabletop.gather.backend.comment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {

  @NotNull private UUID id;

  @NotEmpty(message = "Comment has to be provided")
  @Size(max = 4000, message = "Comment cannot be longer than 4000 characters")
  private String comment;

  @NotNull private UUID user;

  @NotNull private UUID plan;
}
