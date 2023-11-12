package tabletop.gather.backend.model;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SessionUserDTO {

    private Long id;
    private UUID user;

}
