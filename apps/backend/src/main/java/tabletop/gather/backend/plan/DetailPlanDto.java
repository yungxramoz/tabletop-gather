package tabletop.gather.backend.plan;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import tabletop.gather.backend.game.GameDto;
import tabletop.gather.backend.gathering.DetailGatheringDto;
import tabletop.gather.backend.user.UserDto;

@Getter
@Setter
public class DetailPlanDto {
  private UUID id;

  private String name;

  private Boolean isPrivate;

  private String description;

  private int playerLimit;

  private UserDto owner;

  private GameDto game;

  private List<DetailGatheringDto> gatherings;
}
