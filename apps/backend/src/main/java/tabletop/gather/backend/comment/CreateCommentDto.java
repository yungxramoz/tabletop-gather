package tabletop.gather.backend.comment;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommentDto {

  private String comment;

  private UUID planId;
}
