package tabletop.gather.backend.guest;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.gathering.GatheringRepository;
import tabletop.gather.backend.util.NotFoundException;

@Service
@Transactional
public class GuestService {

  private final GuestRepository guestRepository;
  private final GatheringRepository gatheringRepository;

  public GuestService(
      final GuestRepository guestRepository, final GatheringRepository gatheringRepository) {
    this.guestRepository = guestRepository;
    this.gatheringRepository = gatheringRepository;
  }

  public List<GuestDto> findAll() {
    final List<Guest> guests = guestRepository.findAll(Sort.by("id"));
    return guests.stream().map(guest -> mapToDto(guest, new GuestDto())).toList();
  }

  public GuestDto get(final UUID id) {
    return guestRepository
        .findById(id)
        .map(guest -> mapToDto(guest, new GuestDto()))
        .orElseThrow(NotFoundException::new);
  }

  public UUID create(final GuestDto guestDto) {
    final Guest guest = new Guest();
    mapToEntity(guestDto, guest);
    return guestRepository.save(guest).getId();
  }

  public void update(final UUID id, final GuestDto guestDto) {
    final Guest guest = guestRepository.findById(id).orElseThrow(NotFoundException::new);
    mapToEntity(guestDto, guest);
    guestRepository.save(guest);
  }

  public void delete(final UUID id) {
    final Guest guest = guestRepository.findById(id).orElseThrow(NotFoundException::new);
    // remove many-to-many relations at owning side
    gatheringRepository
        .findAllByGuests(guest)
        .forEach(gathering -> gathering.getGuests().remove(guest));
    guestRepository.delete(guest);
  }

  private GuestDto mapToDto(final Guest guest, final GuestDto guestDto) {
    guestDto.setId(guest.getId());
    guestDto.setName(guest.getName());
    guestDto.setEmail(guest.getEmail());
    return guestDto;
  }

  private Guest mapToEntity(final GuestDto guestDto, final Guest guest) {
    guest.setName(guestDto.getName());
    guest.setEmail(guestDto.getEmail());
    return guest;
  }
}
