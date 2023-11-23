package tabletop.gather.backend.plan;

import lombok.Getter;
import lombok.Setter;
import tabletop.gather.backend.gathering.CreateGatheringDto;

import java.util.List;
import java.util.UUID;

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
