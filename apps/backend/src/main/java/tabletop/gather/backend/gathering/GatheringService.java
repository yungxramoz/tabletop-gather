package tabletop.gather.backend.gathering;

import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.guest.Guest;
import tabletop.gather.backend.guest.GuestRepository;
import tabletop.gather.backend.plan.Plan;
import tabletop.gather.backend.plan.PlanRepository;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserRepository;
import tabletop.gather.backend.util.NotFoundException;

@Service
@Transactional
public class GatheringService {

  private final GatheringRepository gatheringRepository;
  private final PlanRepository planRepository;
  private final GuestRepository guestRepository;
  private final UserRepository userRepository;

  public GatheringService(
      final GatheringRepository gatheringRepository,
      final PlanRepository planRepository,
      final GuestRepository guestRepository,
      final UserRepository userRepository) {
    this.gatheringRepository = gatheringRepository;
    this.planRepository = planRepository;
    this.guestRepository = guestRepository;
    this.userRepository = userRepository;
  }

  /**
   * Remove all gatherings from plan and add the ones from the dto where canAttend is true.
   * @param upsertGatheringDtos the gathering attendance status
   * @param userId the id of the user
   */
  public void removeAndAdd(final List<UpsertGatheringDto> upsertGatheringDtos, UUID userId) {
    final User user =
        userRepository.findById(userId).orElseThrow(() -> new NotFoundException("user not found"));
    gatheringRepository.findAllByUsers_Id(userId).stream()
        .filter(
            gathering ->
                upsertGatheringDtos.stream()
                    .anyMatch(
                        upsertGatheringDto -> upsertGatheringDto.getId().equals(gathering.getId())))
        .forEach(
            gathering -> {
              gathering.getUsers().remove(user);
              user.getGatherings().remove(gathering);
              gatheringRepository.save(gathering);
            });

    upsertGatheringDtos.stream()
        .filter(upsertGatheringDto -> upsertGatheringDto.isCanAttend())
        .forEach(
            upsertGatheringDto -> {
              final Gathering gathering =
                  gatheringRepository
                      .findById(upsertGatheringDto.getId())
                      .orElseThrow(() -> new NotFoundException("gathering not found"));
              gathering.getUsers().add(user);
              user.getGatherings().add(gathering);
              gatheringRepository.save(gathering);
            });
  }
}
