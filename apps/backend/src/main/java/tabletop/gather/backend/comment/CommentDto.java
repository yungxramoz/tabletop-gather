package tabletop.gather.backend.comment;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
public class CommentDto {

    private UUID id;

    @Size(max = 4000)
    private String comment;

    private UUID user;

    private UUID plan;

}
