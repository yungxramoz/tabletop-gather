package tabletop.gather.backend.plan;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import tabletop.gather.backend.game.GameDto;

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

  private List<LocalDate> gatheringDates;
}
