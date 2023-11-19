package tabletop.gather.backend.guest;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.gathering.GatheringRepository;
import tabletop.gather.backend.util.NotFoundException;

import java.util.List;
import java.util.UUID;


@Service
@Transactional
public class GuestService {

    private final GuestRepository guestRepository;
    private final GatheringRepository gatheringRepository;

    public GuestService(final GuestRepository guestRepository,
            final GatheringRepository gatheringRepository) {
        this.guestRepository = guestRepository;
        this.gatheringRepository = gatheringRepository;
    }

    public List<GuestDto> findAll() {
        final List<Guest> guests = guestRepository.findAll(Sort.by("id"));
        return guests.stream()
                .map(guest -> mapToDTO(guest, new GuestDto()))
                .toList();
    }

    public GuestDto get(final UUID id) {
        return guestRepository.findById(id)
                .map(guest -> mapToDTO(guest, new GuestDto()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final GuestDto guestDTO) {
        final Guest guest = new Guest();
        mapToEntity(guestDTO, guest);
        return guestRepository.save(guest).getId();
    }

    public void update(final UUID id, final GuestDto guestDTO) {
        final Guest guest = guestRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(guestDTO, guest);
        guestRepository.save(guest);
    }

    public void delete(final UUID id) {
        final Guest guest = guestRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        // remove many-to-many relations at owning side
        gatheringRepository.findAllByGuests(guest)
                .forEach(gathering -> gathering.getGuests().remove(guest));
        guestRepository.delete(guest);
    }

    private GuestDto mapToDTO(final Guest guest, final GuestDto guestDTO) {
        guestDTO.setId(guest.getId());
        guestDTO.setName(guest.getName());
        guestDTO.setEmail(guest.getEmail());
        return guestDTO;
    }

    private Guest mapToEntity(final GuestDto guestDTO, final Guest guest) {
        guest.setName(guestDTO.getName());
        guest.setEmail(guestDTO.getEmail());
        return guest;
    }

}
