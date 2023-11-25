package tabletop.gather.backend.plan;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePlanDto {

  private String name;

  private Boolean isPrivate;

  private String description;

  private int playerLimit;

  private UUID game;
}
