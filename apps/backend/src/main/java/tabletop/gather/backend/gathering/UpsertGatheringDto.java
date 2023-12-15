package tabletop.gather.backend.gathering;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpsertGatheringDto {

  @NotNull(message = "Gathering id is required")
  private UUID id;

  @NotNull(message = "Gathering date is required")
  private boolean canAttend;
}
