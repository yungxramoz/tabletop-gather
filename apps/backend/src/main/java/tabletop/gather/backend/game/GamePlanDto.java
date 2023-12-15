package tabletop.gather.backend.game;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import tabletop.gather.backend.gathering.DateTimeGatheringDto;

@Getter
@Setter
public class GamePlanDto {

  private DateTimeGatheringDto gatheringDto;

  List<GameOwnersDto> games;
}
