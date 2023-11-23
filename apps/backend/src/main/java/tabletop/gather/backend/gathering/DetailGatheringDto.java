package tabletop.gather.backend.gathering;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
public class DetailGatheringDto {
  private UUID id;

  private LocalDate date;

  private LocalTime startTime;

  private int participantCount;
}
