package tabletop.gather.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUserDto {

  @NotEmpty(message = "Username is required")
  @Email(message = "Provide a valid email address")
  @Size(max = 320, message = "Email address is too long")
  private String email;

  @NotEmpty(message = "Password is required")
  @Size(min = 3, max = 64, message = "Password must be between 3 and 64 characters")
  private String password;
}
