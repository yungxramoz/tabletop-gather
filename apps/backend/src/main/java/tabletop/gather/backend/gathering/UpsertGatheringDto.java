package tabletop.gather.backend.gathering;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpsertGatheringDto {

  private UUID id;

  private boolean canAttend;
}
