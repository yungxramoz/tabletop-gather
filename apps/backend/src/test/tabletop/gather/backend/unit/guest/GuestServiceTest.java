package tabletop.gather.backend.unit.guest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;
import tabletop.gather.backend.gathering.GatheringRepository;
import tabletop.gather.backend.guest.Guest;
import tabletop.gather.backend.guest.GuestDto;
import tabletop.gather.backend.guest.GuestRepository;
import tabletop.gather.backend.guest.GuestService;
import tabletop.gather.backend.util.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class GuestServiceTest {

  @InjectMocks private GuestService guestService;

  @Mock private GuestRepository guestRepository;

  @Mock private GatheringRepository gatheringRepository;

  private GuestDto guestDto;
  private Guest guest;
  private UUID id;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
    id = UUID.randomUUID();
    guestDto = new GuestDto();
    guest = new Guest();
    guest.setId(id);
  }

  @Test
  void findAll() {
    Sort expectedSort = Sort.by("id");
    when(guestRepository.findAll(expectedSort)).thenReturn(List.of(guest));

    List<GuestDto> result = guestService.findAll();

    assertNotNull(result);
    assertEquals(1, result.size());
    verify(guestRepository).findAll(expectedSort);
  }

  @Test
  void get() {
    when(guestRepository.findById(id)).thenReturn(Optional.of(guest));

    GuestDto result = guestService.get(id);

    assertNotNull(result);
    verify(guestRepository).findById(id);
  }

  @Test
  void getNotFound() {
    when(guestRepository.findById(id)).thenReturn(Optional.empty());

    assertThrows(NotFoundException.class, () -> guestService.get(id));
  }

  @Test
  void create() {
    when(guestRepository.save(any(Guest.class))).thenReturn(guest);

    UUID result = guestService.create(guestDto);

    assertNotNull(result);
    verify(guestRepository).save(any(Guest.class));
  }

  @Test
  void update() {
    when(guestRepository.findById(id)).thenReturn(Optional.of(guest));
    when(guestRepository.save(any(Guest.class))).thenReturn(guest);

    guestService.update(id, guestDto);

    verify(guestRepository).findById(id);
    verify(guestRepository).save(any(Guest.class));
  }

  @Test
  void updateNotFound() {
    when(guestRepository.findById(id)).thenReturn(Optional.empty());

    assertThrows(NotFoundException.class, () -> guestService.update(id, guestDto));
  }

  @Test
  void delete() {
    when(guestRepository.findById(id)).thenReturn(Optional.of(guest));
    doNothing().when(guestRepository).delete(any(Guest.class));

    guestService.delete(id);

    verify(guestRepository).findById(id);
    verify(gatheringRepository).findAllByGuests(guest);
    verify(guestRepository).delete(guest);
  }

  @Test
  void deleteNotFound() {
    when(guestRepository.findById(id)).thenReturn(Optional.empty());

    assertThrows(NotFoundException.class, () -> guestService.delete(id));
  }
}
