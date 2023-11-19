package tabletop.gather.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import tabletop.gather.backend.game.Game;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByEmail(String username);

  List<User> findAllByGames(Game game);

  boolean existsByEmailIgnoreCase(String email);

}
