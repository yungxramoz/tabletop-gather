package tabletop.gather.backend.game;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface GameRepository extends JpaRepository<Game, UUID> {
  List<Game> findByNameContaining(String name, Sort sort);

  List<Game> findByUsers_Id(UUID userId, Sort sort);
}
