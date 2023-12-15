package tabletop.gather.backend.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

  private UUID id;

  @Size(max = 50, message = "Username must be less than 50 characters")
  private String username;

  @Size(max = 255, message = "Firstname must be less than 255 characters")
  private String firstName;

  @Size(max = 255, message = "Lastname must be less than 255 characters")
  private String lastName;

  @Size(max = 320, message = "Email must be less than 320 characters")
  @Email(message = "Email must be valid")
  private String email;
}
