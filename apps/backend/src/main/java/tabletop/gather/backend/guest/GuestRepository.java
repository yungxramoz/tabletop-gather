package tabletop.gather.backend.guest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface GuestRepository extends JpaRepository<Guest, UUID> {
}
