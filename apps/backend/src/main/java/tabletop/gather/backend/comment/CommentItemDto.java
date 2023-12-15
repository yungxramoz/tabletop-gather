package tabletop.gather.backend.comment;

import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentItemDto {

  private String comment;

  private String user;

  private OffsetDateTime dateCreated;
}
