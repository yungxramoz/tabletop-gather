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

  /**
   * Find all comments.
   *
   * @return A list of comments.
   */
  public List<CommentDto> findAll() {
    final List<Comment> comments = commentRepository.findAll(Sort.by("dateCreated"));
    return comments.stream().map(comment -> mapToDto(comment, new CommentDto())).toList();
  }

  /**
   * Find all comments by plan id.
   *
   * @param id The plan id.
   * @return A list of comments.
   */
  public List<CommentItemDto> findByPlanId(UUID id) {
    planRepository.findById(id).orElseThrow(() -> new NotFoundException("plan not found"));
    final List<Comment> comments = commentRepository.findByPlanId(id, Sort.by("dateCreated"));
    return comments.stream().map(comment -> mapToDto(comment, new CommentItemDto())).toList();
  }

  /**
   * Find all comments by user id.
   *
   * @param id The user id.
   * @return A list of comments.
   */
  public CommentDto get(final UUID id) {
    return commentRepository
        .findById(id)
        .map(comment -> mapToDto(comment, new CommentDto()))
        .orElseThrow(() -> new NotFoundException("comment not found"));
  }

  /**
   * Create a comment.
   *
   * @param commentDto The comment DTO.
   * @return The comment id.
   */
  public UUID create(final CreateCommentDto commentDto, final UUID userId) {
    final Comment comment = new Comment();
    mapToEntity(commentDto, userId, comment);
    return commentRepository.save(comment).getId();
  }

  /**
   * Update a comment.
   *
   * @param id The comment id.
   * @param commentDto The comment DTO.
   */
  public void update(final UUID id, final UpdateCommentDto commentDto, final UUID userId) {
    final Comment comment =
        commentRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("comment not found"));
    if (!comment.getUser().getId().equals(userId)) {
      throw new NotFoundException("comment not found");
    }
    comment.setComment(commentDto.getComment());
    commentRepository.save(comment);
  }

  /**
   * Delete a comment.
   *
   * @param id The comment id.
   */
  public void delete(final UUID id, final UUID userId) {
    final Comment comment =
        commentRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("comment not found"));
    if (!comment.getUser().getId().equals(userId)) {
      throw new NotFoundException("comment not found");
    }
    commentRepository.deleteById(id);
  }

  private CommentDto mapToDto(final Comment comment, final CommentDto commentDto) {
    commentDto.setId(comment.getId());
    commentDto.setComment(comment.getComment());
    commentDto.setUser(comment.getUser() == null ? null : comment.getUser().getId());
    commentDto.setPlan(comment.getPlan() == null ? null : comment.getPlan().getId());
    return commentDto;
  }

  private CommentItemDto mapToDto(final Comment comment, final CommentItemDto commentDto) {
    commentDto.setComment(comment.getComment());
    commentDto.setUser(
        String.format("%s %s", comment.getUser().getFirstName(), comment.getUser().getLastName()));
    commentDto.setDateCreated(comment.getDateCreated());
    return commentDto;
  }

  private Comment mapToEntity(
      final CreateCommentDto commentDto, final UUID userId, final Comment comment) {
    comment.setComment(commentDto.getComment());
    final User user =
        userId == null
            ? null
            : userRepository
                .findById(userId)
                .orElseThrow(() -> new NotFoundException("user not found"));
    comment.setUser(user);
    final Plan plan =
        commentDto.getPlanId() == null
            ? null
            : planRepository
                .findById(commentDto.getPlanId())
                .orElseThrow(() -> new NotFoundException("plan not found"));
    comment.setPlan(plan);
    return comment;
  }
}
