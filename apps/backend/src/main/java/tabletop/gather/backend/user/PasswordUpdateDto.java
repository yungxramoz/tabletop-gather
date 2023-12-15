package tabletop.gather.backend.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class PasswordUpdateDto {

  @NotEmpty(message = "Email is required")
  @Email(message = "Email must be valid")
  private String email;

  @NotEmpty(message = "Password is required")
  @Length(min = 3, max = 64, message = "Password must be between 3 and 64 characters")
  private String password;

  @NotEmpty(message = "New password is required")
  @Length(min = 3, max = 64, message = "New password must be between 3 and 64 characters")
  private String newPassword;
}
