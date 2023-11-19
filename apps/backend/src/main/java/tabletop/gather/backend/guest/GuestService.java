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

    public List<GuestDTO> findAll() {
        final List<Guest> guests = guestRepository.findAll(Sort.by("id"));
        return guests.stream()
                .map(guest -> mapToDTO(guest, new GuestDTO()))
                .toList();
    }

    public GuestDTO get(final UUID id) {
        return guestRepository.findById(id)
                .map(guest -> mapToDTO(guest, new GuestDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final GuestDTO guestDTO) {
        final Guest guest = new Guest();
        mapToEntity(guestDTO, guest);
        return guestRepository.save(guest).getId();
    }

    public void update(final UUID id, final GuestDTO guestDTO) {
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

    private GuestDTO mapToDTO(final Guest guest, final GuestDTO guestDTO) {
        guestDTO.setId(guest.getId());
        guestDTO.setName(guest.getName());
        guestDTO.setEmail(guest.getEmail());
        return guestDTO;
    }

    private Guest mapToEntity(final GuestDTO guestDTO, final Guest guest) {
        guest.setName(guestDTO.getName());
        guest.setEmail(guestDTO.getEmail());
        return guest;
    }

}
