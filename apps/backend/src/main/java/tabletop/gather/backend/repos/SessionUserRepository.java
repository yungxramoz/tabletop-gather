package tabletop.gather.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import tabletop.gather.backend.domain.SessionUser;


public interface SessionUserRepository extends JpaRepository<SessionUser, Long> {
}
