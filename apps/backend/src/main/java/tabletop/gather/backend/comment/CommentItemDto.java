package tabletop.gather.backend.comment;

import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentItemDto {

  private UUID id;

  private String comment;

  private String user;

  private OffsetDateTime dateCreated;
}
