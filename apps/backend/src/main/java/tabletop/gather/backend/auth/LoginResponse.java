
package tabletop.gather.backend.auth;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LoginResponse {

    private String token;

    private long expiresIn;

}

