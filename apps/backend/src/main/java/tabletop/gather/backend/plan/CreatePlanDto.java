package tabletop.gather.backend.plan;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import tabletop.gather.backend.gathering.CreateGatheringDto;

@Getter
@Setter
public class CreatePlanDto {

  private String name;

  private Boolean isPrivate;

  private String description;

  private int playerLimit;

  private UUID gameId;

  private List<CreateGatheringDto> gatherings;
}
