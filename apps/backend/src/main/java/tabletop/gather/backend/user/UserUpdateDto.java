package tabletop.gather.backend.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDto extends UserDto {
  private String password;
}
