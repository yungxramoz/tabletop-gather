package tabletop.gather.backend.unit.comment;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;
import tabletop.gather.backend.comment.*;
import tabletop.gather.backend.plan.Plan;
import tabletop.gather.backend.plan.PlanRepository;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserRepository;

public class CommentServiceTest {

  @Mock private CommentRepository commentRepository;

  @Mock private UserRepository userRepository;

  @Mock private PlanRepository planRepository;

  @InjectMocks private CommentService commentService;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testFindAll() {
    Comment comment1 = new Comment();
    Comment comment2 = new Comment();
    when(commentRepository.findAll(any(Sort.class))).thenReturn(Arrays.asList(comment1, comment2));

    List<CommentDto> response = commentService.findAll();

    assertEquals(2, response.size());
  }

  @Test
  public void testFindByPlanId() {
    UUID planId = UUID.randomUUID();
    User user = new User();
    user.setId(UUID.randomUUID());
    user.setFirstName("first");
    user.setLastName("last");
    Comment comment1 = new Comment();
    comment1.setUser(user);
    Comment comment2 = new Comment();
    comment2.setUser(user);
    when(commentRepository.findByPlanId(any(), any()))
        .thenReturn(Arrays.asList(comment1, comment2));
    when(planRepository.findById(planId)).thenReturn(Optional.of(new Plan()));

    List<CommentItemDto> response = commentService.findByPlanId(planId);

    assertEquals(2, response.size());
    assertEquals("first last", response.get(0).getUser());
    //
  }

  @Test
  public void testGet() {
    UUID commentId = UUID.randomUUID();
    Comment comment = new Comment();
    when(commentRepository.findById(any())).thenReturn(Optional.of(comment));

    CommentDto response = commentService.get(commentId);

    assertEquals(comment.getId(), response.getId());
  }

  @Test
  public void testCreate() {
    UUID userId = UUID.randomUUID();
    User user = new User();
    user.setId(userId);
    Plan plan = new Plan();
    plan.setId(UUID.randomUUID());
    CreateCommentDto createCommentDto = new CreateCommentDto();
    createCommentDto.setPlanId(plan.getId());
    Comment comment = new Comment();
    comment.setId(UUID.randomUUID());
    when(userRepository.findById(any())).thenReturn(Optional.of(user));
    when(planRepository.findById(any())).thenReturn(Optional.of(plan));
    when(commentRepository.save(any())).thenReturn(comment);

    UUID response = commentService.create(createCommentDto, userId);

    assertEquals(comment.getId(), response);
  }

  @Test
  public void testUpdate() {
    UUID commentId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Comment comment = new Comment();
    comment.setId(commentId);
    comment.setUser(new User());
    comment.getUser().setId(userId);
    UpdateCommentDto updateCommentDto = new UpdateCommentDto();
    when(commentRepository.findById(any())).thenReturn(Optional.of(comment));

    commentService.update(commentId, updateCommentDto, userId);

    verify(commentRepository, times(1)).save(any());
  }

  @Test
  public void testDelete() {
    UUID commentId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Comment comment = new Comment();
    comment.setId(commentId);
    comment.setUser(new User());
    comment.getUser().setId(userId);
    when(commentRepository.findById(any())).thenReturn(Optional.of(comment));

    commentService.delete(commentId, userId);

    verify(commentRepository, times(1)).deleteById(any());
  }
}
