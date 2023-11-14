package tabletop.gather.backend.repos;

import java.util.UUID;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import tabletop.gather.backend.domain.User;


public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByEmail(String username);
}
