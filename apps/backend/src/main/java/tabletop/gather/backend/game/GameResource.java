package tabletop.gather.backend.game;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tabletop.gather.backend.jwt.JwtService;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(value = "/api/games", produces = MediaType.APPLICATION_JSON_VALUE)
public class GameResource {

  private final GameService gameService;

  private final JwtService jwtService;

  public GameResource(final GameService gameService, final JwtService jwtService) {
    this.gameService = gameService;
    this.jwtService = jwtService;
  }

  /**
   * Get all games by containing name
   *
   * @param name the name of the game
   * @return all games filtered by containing name
   */
  @GetMapping
  public ResponseEntity<List<GameDto>> getAllGames(final String name) {
    return ResponseEntity.ok(gameService.findByUserId(name));
  }

  /**
   * Get all games of the authenticated user
   *
   * @param token the token of the authenticated user
   * @return all games filtered by user
   */
  @GetMapping("/me")
  public ResponseEntity<List<GameDto>> getMyGames(@RequestHeader("Authorization") final String token) {
    UUID userId = jwtService.getUserByToken(token).getId();
    return ResponseEntity.ok(gameService.findByUserId(userId));
  }

  /**
   * Get all games by user
   *
   * @param userId the id of the user
   * @return all games filtered by user
   */
  @GetMapping("/user/{userId}")
  public ResponseEntity<List<GameDto>> getGamesByUser(@PathVariable(name = "userId") final UUID userId) {
    return ResponseEntity.ok(gameService.findByUserId(userId));
  }

  /**
   * Get a game by id
   *
   * @param id the id of the game
   * @return the game
   */
  @GetMapping("/{id}")
  public ResponseEntity<GameDto> getGame(@PathVariable(name = "id") final UUID id) {
    return ResponseEntity.ok(gameService.get(id));
  }

  /**
   * Add a game to collection of authenticated user
   *
   * @param id the game to add
   * @return 201 if added
   */
  @PostMapping("/{id}/add")
  @ApiResponse(responseCode = "201")
  public ResponseEntity<Void> addGameToUser(@RequestHeader("Authorization") final String token,
                                            @PathVariable(name = "id") final UUID id) {
    UUID userId = jwtService.getUserByToken(token).getId();
    gameService.addUser(id, userId);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  /**
   * Remove a game from collection of authenticated user
   *
   * @param id the game to remove
   * @return 204 if removed
   */
  @DeleteMapping("/{id}/remove")
  @ApiResponse(responseCode = "204")
  public ResponseEntity<Void> removeGameFromUser(@RequestHeader("Authorization") final String token,
                                                 @PathVariable(name = "id") final UUID id) {
    UUID userId = jwtService.getUserByToken(token).getId();
    gameService.removeUser(id, userId);
    return ResponseEntity.noContent().build();
  }
}
