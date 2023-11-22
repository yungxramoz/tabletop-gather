
package tabletop.gather.backend.jwt;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class JwtDto {

    private String token;

    private long expiresIn;

}

