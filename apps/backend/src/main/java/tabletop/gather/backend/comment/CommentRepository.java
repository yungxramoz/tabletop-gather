package tabletop.gather.backend.comment;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
  List<Comment> findByPlanId(UUID id, Sort sort);
}
