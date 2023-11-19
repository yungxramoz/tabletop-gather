package tabletop.gather.backend.auth;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LoginUserDto {

    @Size(max = 320)
    private String email;

    @Size(max = 64)
    private String password;

}