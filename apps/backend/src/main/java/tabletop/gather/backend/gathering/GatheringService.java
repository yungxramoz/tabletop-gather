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

    public List<GatheringDto> findAll() {
        final List<Gathering> gatherings = gatheringRepository.findAll(Sort.by("id"));
        return gatherings.stream()
                .map(gathering -> mapToDto(gathering, new GatheringDto()))
                .toList();
    }

    public GatheringDto get(final UUID id) {
        return gatheringRepository.findById(id)
                .map(gathering -> mapToDto(gathering, new GatheringDto()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final GatheringDto gatheringDto) {
        final Gathering gathering = new Gathering();
        mapToEntity(gatheringDto, gathering);
        return gatheringRepository.save(gathering).getId();
    }

    public void update(final UUID id, final GatheringDto gatheringDto) {
        final Gathering gathering = gatheringRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(gatheringDto, gathering);
        gatheringRepository.save(gathering);
    }

    public void delete(final UUID id) {
        gatheringRepository.deleteById(id);
    }

    private GatheringDto mapToDto(final Gathering gathering, final GatheringDto gatheringDto) {
        gatheringDto.setId(gathering.getId());
        gatheringDto.setDate(gathering.getDate());
        gatheringDto.setStartTime(gathering.getStartTime());
        gatheringDto.setPlan(gathering.getPlan() == null ? null : gathering.getPlan().getId());
        gatheringDto.setGuests(gathering.getGuests().stream()
                .map(guest -> guest.getId())
                .toList());
        gatheringDto.setUsers(gathering.getUsers().stream()
                .map(user -> user.getId())
                .toList());
        return gatheringDto;
    }

    private Gathering mapToEntity(final GatheringDto gatheringDto, final Gathering gathering) {
        gathering.setDate(gatheringDto.getDate());
        gathering.setStartTime(gatheringDto.getStartTime());
        final Plan plan = gatheringDto.getPlan() == null ? null : planRepository.findById(gatheringDto.getPlan())
                .orElseThrow(() -> new NotFoundException("plan not found"));
        gathering.setPlan(plan);
        final List<Guest> guests = guestRepository.findAllById(
                gatheringDto.getGuests() == null ? Collections.emptyList() : gatheringDto.getGuests());
        if (guests.size() != (gatheringDto.getGuests() == null ? 0 : gatheringDto.getGuests().size())) {
            throw new NotFoundException("one of guests not found");
        }
        gathering.setGuests(guests.stream().collect(Collectors.toSet()));
        final List<User> users = userRepository.findAllById(
                gatheringDto.getUsers() == null ? Collections.emptyList() : gatheringDto.getUsers());
        if (users.size() != (gatheringDto.getUsers() == null ? 0 : gatheringDto.getUsers().size())) {
            throw new NotFoundException("one of users not found");
        }
        gathering.setUsers(users.stream().collect(Collectors.toSet()));
        return gathering;
    }

}
