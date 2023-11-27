package tabletop.gather.backend.gathering;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import tabletop.gather.backend.guest.Guest;
import tabletop.gather.backend.user.User;

public interface GatheringRepository extends JpaRepository<Gathering, UUID> {

  List<Gathering> findAllByGuests(Guest guest);

  List<Gathering> findAllByUsers(User user);

  List<Gathering> findAllByPlanId(UUID planId, Sort sort);
}
