package tabletop.gather.backend.game;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, UUID> {
  List<Game> findByNameContaining(String name, Sort sort);

  List<Game> findByUsers_Id(UUID userId, Sort sort);
}
