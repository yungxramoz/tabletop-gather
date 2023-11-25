package tabletop.gather.backend.plan;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, UUID> {
  List<Plan> findAllByIsPrivateFalse();

  List<Plan> findAllByUserId(UUID userId);
}
