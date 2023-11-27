package tabletop.gather.backend.comment;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.plan.Plan;
import tabletop.gather.backend.plan.PlanRepository;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserRepository;
import tabletop.gather.backend.util.NotFoundException;

@Service
public class CommentService {

  private final CommentRepository commentRepository;
  private final UserRepository userRepository;
  private final PlanRepository planRepository;

  public CommentService(
      final CommentRepository commentRepository,
      final UserRepository userRepository,
      final PlanRepository planRepository) {
    this.commentRepository = commentRepository;
    this.userRepository = userRepository;
    this.planRepository = planRepository;
  }

  public List<CommentDto> findAll() {
    final List<Comment> comments = commentRepository.findAll(Sort.by("id"));
    return comments.stream().map(comment -> mapToDto(comment, new CommentDto())).toList();
  }

  public CommentDto get(final UUID id) {
    return commentRepository
        .findById(id)
        .map(comment -> mapToDto(comment, new CommentDto()))
        .orElseThrow(NotFoundException::new);
  }

  public UUID create(final CommentDto commentDto) {
    final Comment comment = new Comment();
    mapToEntity(commentDto, comment);
    return commentRepository.save(comment).getId();
  }

  public void update(final UUID id, final CommentDto commentDto) {
    final Comment comment = commentRepository.findById(id).orElseThrow(NotFoundException::new);
    mapToEntity(commentDto, comment);
    commentRepository.save(comment);
  }

  public void delete(final UUID id) {
    commentRepository.deleteById(id);
  }

  private CommentDto mapToDto(final Comment comment, final CommentDto commentDto) {
    commentDto.setId(comment.getId());
    commentDto.setComment(comment.getComment());
    commentDto.setUser(comment.getUser() == null ? null : comment.getUser().getId());
    commentDto.setPlan(comment.getPlan() == null ? null : comment.getPlan().getId());
    return commentDto;
  }

  private Comment mapToEntity(final CommentDto commentDto, final Comment comment) {
    comment.setComment(commentDto.getComment());
    final User user =
        commentDto.getUser() == null
            ? null
            : userRepository
                .findById(commentDto.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
    comment.setUser(user);
    final Plan plan =
        commentDto.getPlan() == null
            ? null
            : planRepository
                .findById(commentDto.getPlan())
                .orElseThrow(() -> new NotFoundException("plan not found"));
    comment.setPlan(plan);
    return comment;
  }
}
