package tabletop.gather.backend.gathering;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class CreateGatheringDto {

  private LocalDate date;

  private LocalTime startTime;
}
