package tabletop.gather.backend.comment;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tabletop.gather.backend.jwt.JwtService;

@RestController
@RequestMapping(value = "/api/comments", produces = MediaType.APPLICATION_JSON_VALUE)
public class CommentResource {

  private final CommentService commentService;
  private final JwtService jwtService;

  public CommentResource(final CommentService commentService, final JwtService jwtService) {
    this.commentService = commentService;
    this.jwtService = jwtService;
  }

  /**
   * Get all comments of a plan.
   *
   * @return A list of comments.
   */
  @GetMapping("/plan/{id}")
  @ApiResponse(responseCode = "200")
  public ResponseEntity<List<CommentItemDto>> getCommentsByPlanId(
      @PathVariable(name = "id") final UUID id) {
    return ResponseEntity.ok(commentService.findByPlanId(id));
  }

  /**
   * Get all comments of a user.
   *
   * @return A list of comments.
   */
  @PostMapping
  @ApiResponse(responseCode = "201")
  public ResponseEntity<UUID> createComment(
      @RequestHeader("Authorization") final String token,
      @RequestBody @Valid final CreateCommentDto commentDto) {
    UUID userId = jwtService.getUserByToken(token).getId();
    final UUID createdId = commentService.create(commentDto, userId);
    return new ResponseEntity<>(createdId, HttpStatus.CREATED);
  }

  /**
   * Update a comment.
   *
   * @param id The comment id.
   * @param commentDto The comment data.
   * @return The updated comment id.
   */
  @PutMapping("/{id}")
  public ResponseEntity<UUID> updateComment(
      @RequestHeader("Authorization") final String token,
      @PathVariable(name = "id") final UUID id,
      @RequestBody @Valid final UpdateCommentDto commentDto) {
    UUID userId = jwtService.getUserByToken(token).getId();
    commentService.update(id, commentDto, userId);
    return ResponseEntity.ok(id);
  }

  /**
   * Delete a comment.
   *
   * @param id The comment id.
   * @return The deleted comment id.
   */
  @DeleteMapping("/{id}")
  @ApiResponse(responseCode = "204")
  public ResponseEntity<Void> deleteComment(
      @RequestHeader("Authorization") final String token,
      @PathVariable(name = "id") final UUID id) {
    UUID userId = jwtService.getUserByToken(token).getId();
    commentService.delete(id, userId);
    return ResponseEntity.noContent().build();
  }
}
