package tabletop.gather.backend.game;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, UUID> {
  Page<Game> findByNameContainingIgnoreCase(String name, Pageable pageable);

  List<Game> findByUsers_Id(UUID userId, Sort sort);

  List<Game> findByUsersGatheringsPlanId(UUID id);
}
