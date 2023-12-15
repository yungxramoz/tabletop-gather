package tabletop.gather.backend.unit.comment;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tabletop.gather.backend.comment.*;
import tabletop.gather.backend.jwt.JwtService;
import tabletop.gather.backend.user.UserDto;

public class CommentResourceTest {

  @Mock private CommentService commentService;

  @Mock private JwtService jwtService;

  @InjectMocks private CommentResource commentResource;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testGetCommentsByPlanId() {
    UUID planId = UUID.randomUUID();
    List<CommentItemDto> comments = new ArrayList<>();
    when(commentService.findByPlanId(planId)).thenReturn(comments);

    ResponseEntity<List<CommentItemDto>> response = commentResource.getCommentsByPlanId(planId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(comments, response.getBody());
  }

  @Test
  public void testCreateComment() {
    UUID userId = UUID.randomUUID();
    UserDto user = new UserDto();
    user.setId(userId);
    CreateCommentDto commentDto = new CreateCommentDto();
    when(jwtService.getUserByToken("token")).thenReturn(user);
    when(commentService.create(commentDto, userId)).thenReturn(userId);

    ResponseEntity<UUID> response = commentResource.createComment("token", commentDto);

    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    assertEquals(userId, response.getBody());
  }

  @Test
  public void testUpdateComment() {
    UUID commentId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    UserDto user = new UserDto();
    user.setId(userId);
    UpdateCommentDto commentDto = new UpdateCommentDto();
    when(jwtService.getUserByToken("token")).thenReturn(user);

    ResponseEntity<UUID> response = commentResource.updateComment("token", commentId, commentDto);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(commentId, response.getBody());
  }

  @Test
  public void testDeleteComment() {
    UUID commentId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    UserDto user = new UserDto();
    user.setId(userId);
    when(jwtService.getUserByToken("token")).thenReturn(user);

    ResponseEntity<Void> response = commentResource.deleteComment("token", commentId);

    assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
  }
}
