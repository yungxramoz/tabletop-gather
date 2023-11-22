package tabletop.gather.backend.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordUpdateDto {
  private String email;
  private String password;
  private String newPassword;
}
