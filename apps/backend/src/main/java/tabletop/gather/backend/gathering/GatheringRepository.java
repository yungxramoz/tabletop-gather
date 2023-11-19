package tabletop.gather.backend.gathering;

import org.springframework.data.jpa.repository.JpaRepository;
import tabletop.gather.backend.guest.Guest;
import tabletop.gather.backend.user.User;

import java.util.List;
import java.util.UUID;


public interface GatheringRepository extends JpaRepository<Gathering, UUID> {

    List<Gathering> findAllByGuests(Guest guest);

    List<Gathering> findAllByUsers(User user);

}
