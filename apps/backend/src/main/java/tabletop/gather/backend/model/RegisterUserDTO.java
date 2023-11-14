package tabletop.gather.backend.model;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RegisterUserDTO {

    @Size(max = 50)
    private String username;

    @Size(max = 255)
    private String firstName;

    @Size(max = 255)
    private String lastName;

    @Size(max = 320)
    private String email;

    @Size(max = 64)
    private String password;

}
