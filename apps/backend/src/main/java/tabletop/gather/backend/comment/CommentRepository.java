package tabletop.gather.backend.comment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface CommentRepository extends JpaRepository<Comment, UUID> {
}
