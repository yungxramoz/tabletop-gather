package tabletop.gather.backend.game;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameOwnersDto extends GameDto {

  private List<String> owners;
}
