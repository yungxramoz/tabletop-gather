package tabletop.gather.backend.unit.gathering;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tabletop.gather.backend.gathering.*;
import tabletop.gather.backend.jwt.*;
import tabletop.gather.backend.user.*;

public class GatheringResourceTest {

  @InjectMocks private GatheringResource gatheringResource;

  @Mock private GatheringService gatheringService;

  @Mock private JwtService jwtService;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testAttendGathering() {
    String token = "token";
    UUID userId = UUID.randomUUID();
    UserDto userDto = new UserDto();
    userDto.setId(userId);
    when(jwtService.getUserByToken(token)).thenReturn(userDto);

    UpsertGatheringDto upsertGatheringDto = new UpsertGatheringDto();
    upsertGatheringDto.setId(UUID.randomUUID());
    upsertGatheringDto.setCanAttend(true);

    ResponseEntity<UUID> response =
        gatheringResource.attendGathering(token, Arrays.asList(upsertGatheringDto));

    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    verify(gatheringService, times(1)).removeAndAdd(anyList(), eq(userId));
  }
}
