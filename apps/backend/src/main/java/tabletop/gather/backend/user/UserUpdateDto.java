package tabletop.gather.backend.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDto extends UserDto {
  @NotEmpty(message = "Password is required")
  private String password;
}
