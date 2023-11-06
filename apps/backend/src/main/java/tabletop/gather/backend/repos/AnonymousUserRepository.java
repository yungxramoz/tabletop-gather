package tabletop.gather.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import tabletop.gather.backend.domain.AnonymousUser;


public interface AnonymousUserRepository extends JpaRepository<AnonymousUser, Long> {
}
