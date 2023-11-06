package tabletop.gather.backend.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDTO {

    private UUID id;

    @Size(max = 50)
    private String username;

    @Size(max = 255)
    private String firstName;

    @Size(max = 255)
    private String lastName;

    @Size(max = 64)
    private String passwordHash;

    @Size(max = 128)
    private String passwordSalt;

    @NotNull
    private Long sessionUser;

}
