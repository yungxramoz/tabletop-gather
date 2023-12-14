package tabletop.gather.backend.gathering;

import jakarta.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateGatheringDto {

  @NotEmpty(message = "Gathering date is required")
  private LocalDate date;

  @NotEmpty(message = "Gathering start time is required")
  private LocalTime startTime;
}
