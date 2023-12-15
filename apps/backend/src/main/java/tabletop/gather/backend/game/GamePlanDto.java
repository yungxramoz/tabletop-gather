package tabletop.gather.backend.game;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GamePlanDto {

  private LocalDate gatheringDate;

  private LocalTime gatheringStartTime;

  List<GameOwnersDto> games;
}
