package tabletop.gather.backend.game;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GamePlanDto {

  private UUID gameId;

  private String name;

  private String description;

  private String imageUrl;

  private int minPlayer;

  private int maxPlayer;

  private List<String> owners;
}
