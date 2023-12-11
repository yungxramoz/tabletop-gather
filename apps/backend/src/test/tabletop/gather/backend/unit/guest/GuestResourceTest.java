package tabletop.gather.backend.unit.guest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tabletop.gather.backend.guest.GuestDto;
import tabletop.gather.backend.guest.GuestResource;
import tabletop.gather.backend.guest.GuestService;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class GuestResourceTest {

  @InjectMocks private GuestResource guestResource;

  @Mock private GuestService guestService;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testGetAllGuests() {
    List<GuestDto> allGuests = Arrays.asList(new GuestDto());

    when(guestService.findAll()).thenReturn(allGuests);

    ResponseEntity<List<GuestDto>> response = guestResource.getAllGuests();

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(allGuests, response.getBody());
  }

  @Test
  public void testGetGuest() {
    GuestDto guestDto = new GuestDto();
    when(guestService.get(guestDto.getId())).thenReturn(guestDto);

    ResponseEntity<GuestDto> response = guestResource.getGuest(guestDto.getId());

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(guestDto, response.getBody());
  }

  @Test
  public void testCreateGuest() {
    UUID guestId = UUID.randomUUID();
    GuestDto guestDto = new GuestDto();
    guestDto.setId(guestId);

    ResponseEntity<UUID> response = guestResource.createGuest(guestDto);

    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    verify(guestService, times(1)).create(guestDto);
  }

  @Test
  public void testUpdateGuest() {
    UUID guestId = UUID.randomUUID();
    GuestDto guestDto = new GuestDto();
    guestDto.setId(guestId);

    ResponseEntity<UUID> response = guestResource.updateGuest(guestId, guestDto);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    verify(guestService, times(1)).update(guestId, guestDto);
  }

  @Test
  public void testDeleteGuest() {
    UUID guestId = UUID.randomUUID();

    ResponseEntity<Void> response = guestResource.deleteGuest(guestId);

    assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    verify(guestService, times(1)).delete(guestId);
  }
}
