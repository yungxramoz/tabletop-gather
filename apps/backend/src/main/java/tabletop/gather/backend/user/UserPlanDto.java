package tabletop.gather.backend.user;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import tabletop.gather.backend.gathering.DateTimeGatheringDto;

@Getter
@Setter
public class UserPlanDto {

  private String fullName;

  private List<DateTimeGatheringDto> attendingGatherings;
}
