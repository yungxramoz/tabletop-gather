package tabletop.gather.backend.comment;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.plan.Plan;
import tabletop.gather.backend.plan.PlanRepository;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserRepository;
import tabletop.gather.backend.util.NotFoundException;

import java.util.List;
import java.util.UUID;


@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;

    public CommentService(final CommentRepository commentRepository,
            final UserRepository userRepository, final PlanRepository planRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.planRepository = planRepository;
    }

    public List<CommentDto> findAll() {
        final List<Comment> comments = commentRepository.findAll(Sort.by("id"));
        return comments.stream()
                .map(comment -> mapToDTO(comment, new CommentDto()))
                .toList();
    }

    public CommentDto get(final UUID id) {
        return commentRepository.findById(id)
                .map(comment -> mapToDTO(comment, new CommentDto()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final CommentDto commentDTO) {
        final Comment comment = new Comment();
        mapToEntity(commentDTO, comment);
        return commentRepository.save(comment).getId();
    }

    public void update(final UUID id, final CommentDto commentDTO) {
        final Comment comment = commentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(commentDTO, comment);
        commentRepository.save(comment);
    }

    public void delete(final UUID id) {
        commentRepository.deleteById(id);
    }

    private CommentDto mapToDTO(final Comment comment, final CommentDto commentDTO) {
        commentDTO.setId(comment.getId());
        commentDTO.setComment(comment.getComment());
        commentDTO.setUser(comment.getUser() == null ? null : comment.getUser().getId());
        commentDTO.setPlan(comment.getPlan() == null ? null : comment.getPlan().getId());
        return commentDTO;
    }

    private Comment mapToEntity(final CommentDto commentDTO, final Comment comment) {
        comment.setComment(commentDTO.getComment());
        final User user = commentDTO.getUser() == null ? null : userRepository.findById(commentDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        comment.setUser(user);
        final Plan plan = commentDTO.getPlan() == null ? null : planRepository.findById(commentDTO.getPlan())
                .orElseThrow(() -> new NotFoundException("plan not found"));
        comment.setPlan(plan);
        return comment;
    }

}
