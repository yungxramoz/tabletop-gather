package tabletop.gather.backend.plan;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UpdatePlanDto {

  @NotEmpty(message = "Plan name is required")
  @Length(max = 255, message = "Plan name cannot be longer than 255 characters")
  private String name;

  @NotNull(message = "Plan private is required")
  private Boolean isPrivate;

  @Length(max = 4000, message = "Plan description cannot be longer than 4000 characters")
  private String description;

  private int playerLimit;

  private UUID game;
}
