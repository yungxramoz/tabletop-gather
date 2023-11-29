package tabletop.gather.backend.user;

import lombok.Getter;
import lombok.Setter;
import tabletop.gather.backend.gathering.DateTimeGatheringDto;

import java.util.List;

@Getter
@Setter
public class UserPlanDto {

  private String fullName;

  private List<DateTimeGatheringDto> attendingGatherings;
}
