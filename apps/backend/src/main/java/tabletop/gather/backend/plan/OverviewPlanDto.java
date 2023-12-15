package tabletop.gather.backend.plan;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import tabletop.gather.backend.game.GameDto;
import tabletop.gather.backend.gathering.OverviewGatheringDto;

@Getter
@Setter
public class OverviewPlanDto {
  private UUID id;

  private String name;

  private Boolean isPrivate;

  private String description;

  private int playerLimit;

  private String ownerName;

  private GameDto game;

  private List<OverviewGatheringDto> gatheringDtos;
}
