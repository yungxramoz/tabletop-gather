package tabletop.gather.backend.user;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import tabletop.gather.backend.game.Game;

public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findByEmail(String username);

  List<User> findByGatheringsPlanId(UUID id);

  List<User> findAllByGames(Game game);

  boolean existsByEmailIgnoreCase(String email);
}
