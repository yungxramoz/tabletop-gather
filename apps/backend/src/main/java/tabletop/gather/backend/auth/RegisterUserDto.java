package tabletop.gather.backend.auth;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {

  @NotEmpty(message = "Username is required")
  @Size(max = 50, message = "Username is too long")
  private String username;

  @NotEmpty(message = "First name is required")
  @Size(max = 255, message = "First name is too long")
  private String firstName;

  @NotEmpty(message = "Last name is required")
  @Size(max = 255, message = "Last name is too long")
  private String lastName;

  @NotEmpty(message = "Email is required")
  @Email(message = "Provide a valid email address")
  @Size(max = 320, message = "Email address is too long")
  private String email;

  @NotEmpty(message = "Password is required")
  @Size(min = 3, max = 64, message = "Password must be between 3 and 64 characters")
  private String password;
}
