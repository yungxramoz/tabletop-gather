package tabletop.gather.backend.gathering;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetailGatheringDto {
  private UUID id;

  private LocalDate date;

  private LocalTime startTime;

  private int participantCount;
}
