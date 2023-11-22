package tabletop.gather.backend.plan;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface PlanRepository extends JpaRepository<Plan, UUID> {
  List<Plan> findAllByIsPrivateFalseOrderByNameDesc();
}
