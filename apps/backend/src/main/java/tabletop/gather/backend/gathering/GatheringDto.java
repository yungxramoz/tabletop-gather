package tabletop.gather.backend.gathering;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GatheringDto {

  private UUID id;

  @NotNull private LocalDate date;

  @NotNull
  @Schema(type = "string", example = "18:30")
  private LocalTime startTime;

  private UUID plan;

  private List<UUID> guests;

  private List<UUID> users;
}
