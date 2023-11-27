package tabletop.gather.backend.guest;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, UUID> {}
