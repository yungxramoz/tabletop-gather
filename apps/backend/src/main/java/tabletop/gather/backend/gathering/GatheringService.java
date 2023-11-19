package tabletop.gather.backend.gathering;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.guest.Guest;
import tabletop.gather.backend.guest.GuestRepository;
import tabletop.gather.backend.plan.Plan;
import tabletop.gather.backend.plan.PlanRepository;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserRepository;
import tabletop.gather.backend.util.NotFoundException;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@Transactional
public class GatheringService {

    private final GatheringRepository gatheringRepository;
    private final PlanRepository planRepository;
    private final GuestRepository guestRepository;
    private final UserRepository userRepository;

    public GatheringService(final GatheringRepository gatheringRepository,
            final PlanRepository planRepository, final GuestRepository guestRepository,
            final UserRepository userRepository) {
        this.gatheringRepository = gatheringRepository;
        this.planRepository = planRepository;
        this.guestRepository = guestRepository;
        this.userRepository = userRepository;
    }

    public List<GatheringDTO> findAll() {
        final List<Gathering> gatherings = gatheringRepository.findAll(Sort.by("id"));
        return gatherings.stream()
                .map(gathering -> mapToDTO(gathering, new GatheringDTO()))
                .toList();
    }

    public GatheringDTO get(final UUID id) {
        return gatheringRepository.findById(id)
                .map(gathering -> mapToDTO(gathering, new GatheringDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final GatheringDTO gatheringDTO) {
        final Gathering gathering = new Gathering();
        mapToEntity(gatheringDTO, gathering);
        return gatheringRepository.save(gathering).getId();
    }

    public void update(final UUID id, final GatheringDTO gatheringDTO) {
        final Gathering gathering = gatheringRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(gatheringDTO, gathering);
        gatheringRepository.save(gathering);
    }

    public void delete(final UUID id) {
        gatheringRepository.deleteById(id);
    }

    private GatheringDTO mapToDTO(final Gathering gathering, final GatheringDTO gatheringDTO) {
        gatheringDTO.setId(gathering.getId());
        gatheringDTO.setDate(gathering.getDate());
        gatheringDTO.setStartTime(gathering.getStartTime());
        gatheringDTO.setEndTime(gathering.getEndTime());
        gatheringDTO.setPlan(gathering.getPlan() == null ? null : gathering.getPlan().getId());
        gatheringDTO.setGuests(gathering.getGuests().stream()
                .map(guest -> guest.getId())
                .toList());
        gatheringDTO.setUsers(gathering.getUsers().stream()
                .map(user -> user.getId())
                .toList());
        return gatheringDTO;
    }

    private Gathering mapToEntity(final GatheringDTO gatheringDTO, final Gathering gathering) {
        gathering.setDate(gatheringDTO.getDate());
        gathering.setStartTime(gatheringDTO.getStartTime());
        gathering.setEndTime(gatheringDTO.getEndTime());
        final Plan plan = gatheringDTO.getPlan() == null ? null : planRepository.findById(gatheringDTO.getPlan())
                .orElseThrow(() -> new NotFoundException("plan not found"));
        gathering.setPlan(plan);
        final List<Guest> guests = guestRepository.findAllById(
                gatheringDTO.getGuests() == null ? Collections.emptyList() : gatheringDTO.getGuests());
        if (guests.size() != (gatheringDTO.getGuests() == null ? 0 : gatheringDTO.getGuests().size())) {
            throw new NotFoundException("one of guests not found");
        }
        gathering.setGuests(guests.stream().collect(Collectors.toSet()));
        final List<User> users = userRepository.findAllById(
                gatheringDTO.getUsers() == null ? Collections.emptyList() : gatheringDTO.getUsers());
        if (users.size() != (gatheringDTO.getUsers() == null ? 0 : gatheringDTO.getUsers().size())) {
            throw new NotFoundException("one of users not found");
        }
        gathering.setUsers(users.stream().collect(Collectors.toSet()));
        return gathering;
    }

}
