package tabletop.gather.backend.unit.gathering;

import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tabletop.gather.backend.gathering.*;
import tabletop.gather.backend.guest.*;
import tabletop.gather.backend.plan.*;
import tabletop.gather.backend.user.*;

public class GatheringServiceTest {
  @InjectMocks private GatheringService gatheringService;

  @Mock private GatheringRepository gatheringRepository;

  @Mock private PlanRepository planRepository;

  @Mock private GuestRepository guestRepository;

  @Mock private UserRepository userRepository;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testRemoveAndAdd() {
    UUID userId = UUID.randomUUID();
    User user = new User();
    user.setId(userId);
    user.setGatherings(new HashSet<>());
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));

    UUID gatheringId1 = UUID.randomUUID();
    Gathering gathering1 = new Gathering();
    gathering1.setId(gatheringId1);
    gathering1.setUsers(new HashSet<>(Arrays.asList(user)));

    UUID gatheringId2 = UUID.randomUUID();
    Gathering gathering2 = new Gathering();
    gathering2.setId(gatheringId2);
    gathering2.setUsers(new HashSet<>(Arrays.asList(user)));

    when(gatheringRepository.findAllByUsers_Id(userId))
        .thenReturn(Arrays.asList(gathering1, gathering2));

    UpsertGatheringDto upsertGatheringDto1 = new UpsertGatheringDto();
    upsertGatheringDto1.setId(gatheringId1);
    upsertGatheringDto1.setCanAttend(true);

    UpsertGatheringDto upsertGatheringDto2 = new UpsertGatheringDto();
    upsertGatheringDto2.setId(gatheringId2);
    upsertGatheringDto2.setCanAttend(false);

    when(gatheringRepository.findById(gatheringId1)).thenReturn(Optional.of(gathering1));
    when(gatheringRepository.findById(gatheringId2)).thenReturn(Optional.of(gathering2));

    gatheringService.removeAndAdd(Arrays.asList(upsertGatheringDto1, upsertGatheringDto2), userId);

    verify(gatheringRepository, times(2)).save(gathering1); // remove and add
    verify(gatheringRepository, times(1)).save(gathering2); // remove
  }
}
