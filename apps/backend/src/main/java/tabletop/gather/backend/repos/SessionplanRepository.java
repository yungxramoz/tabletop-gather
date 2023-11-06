package tabletop.gather.backend.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import tabletop.gather.backend.domain.Sessionplan;


public interface SessionplanRepository extends JpaRepository<Sessionplan, UUID> {
}
