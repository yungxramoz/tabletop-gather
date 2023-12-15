package tabletop.gather.backend.plan;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import tabletop.gather.backend.gathering.CreateGatheringDto;

@Getter
@Setter
public class CreatePlanDto {

  @NotEmpty(message = "Plan name is required")
  @Length(max = 255, message = "Plan name cannot be longer than 50 characters")
  private String name;

  @NotNull(message = "Plan private is required")
  private Boolean isPrivate;

  @Length(max = 4000, message = "Plan description cannot be longer than 4000 characters")
  private String description;

  private int playerLimit;

  private UUID gameId;

  private List<CreateGatheringDto> gatherings;
}
