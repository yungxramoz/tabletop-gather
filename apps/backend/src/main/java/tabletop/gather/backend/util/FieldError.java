package tabletop.gather.backend.util;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FieldError {

  private String field;
  private String errorCode;
}
