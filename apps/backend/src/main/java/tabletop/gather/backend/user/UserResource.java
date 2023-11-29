package tabletop.gather.backend.user;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tabletop.gather.backend.auth.AuthenticationService;
import tabletop.gather.backend.jwt.JwtDto;
import tabletop.gather.backend.jwt.JwtService;

@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
public class UserResource {

  private final UserService userService;
  private final JwtService jwtService;

  private final AuthenticationService authenticationService;

  public UserResource(
      final UserService userService,
      final JwtService jwtService,
      final AuthenticationService authenticationService) {
    this.userService = userService;
    this.jwtService = jwtService;
    this.authenticationService = authenticationService;
  }

  /**
   * Returns all users.
   *
   * @return List of all users
   */
  @GetMapping
  public ResponseEntity<List<UserDto>> getAllUsers() {
    return ResponseEntity.ok(userService.findAll());
  }

  /**
   * Returns the user with the given id.
   *
   * @param id the id of the user to return
   * @return UserDto with the given id
   */
  @GetMapping("/{id}")
  public ResponseEntity<UserDto> getUser(@PathVariable(name = "id") final UUID id) {
    return ResponseEntity.ok(userService.get(id));
  }

  /**
   * Returns all users attending the plan with the given id.
   *
   * @param id the id of the plan
   * @return List of all users attending the plan
   */
  @GetMapping("/plan/{id}")
  public ResponseEntity<List<UserPlanDto>> getUsersByPlanId(@PathVariable(name = "id") final UUID id) {
    return ResponseEntity.ok(userService.findByPlanId(id));
  }

  /**
   * Updates the authenticated user.
   *
   * @param token the JWT token
   * @param userDto the user Dto to update
   * @return JWT token with expiration time
   */
  @PutMapping("/me")
  public ResponseEntity<JwtDto> updateAuthenticatedUser(
      @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
      @RequestBody @Valid final UserUpdateDto userDto) {
    UserDto user = jwtService.getUserByToken(token);
    authenticationService.verifyEmailPassword(user.getEmail(), userDto.getPassword());
    User updatedUser = userService.update(user.getId(), userDto, user.getEmail());
    JwtDto jwtToken = jwtService.getNewJwtToken(updatedUser);

    return ResponseEntity.ok(jwtToken);
  }

  /**
   * Deletes the authenticated user.
   *
   * @param token the JWT token
   * @return 204
   */
  @DeleteMapping("/me")
  @ApiResponse(responseCode = "204")
  public ResponseEntity<Void> deleteAuthenticatedUser(
      @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
    UserDto user = jwtService.getUserByToken(token);
    userService.delete(user.getId());
    return ResponseEntity.noContent().build();
  }

  /**
   * Returns the authenticated user.
   *
   * @param token the JWT token
   * @return UserDto of the authenticated user
   */
  @GetMapping("/me")
  @ApiResponse(responseCode = "200")
  public ResponseEntity<UserDto> getAuthenticatedUser(
      @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
    UserDto user = jwtService.getUserByToken(token);
    return ResponseEntity.ok(user);
  }

  /**
   * Updates the password of the authenticated user.
   *
   * @param passwordUpdateDto the password update Dto
   * @param token the JWT token
   * @return JWT token with expiration time
   */
  @PutMapping("/me/password")
  @ApiResponse(responseCode = "200")
  public ResponseEntity<JwtDto> updatePassword(
      @RequestBody @Valid final PasswordUpdateDto passwordUpdateDto,
      @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
    UserDto user = jwtService.getUserByToken(token);
    authenticationService.verifyEmailPassword(user.getEmail(), passwordUpdateDto.getPassword());
    User newUser = userService.updatePassword(user.getId(), passwordUpdateDto);

    JwtDto jwtToken = jwtService.getNewJwtToken(newUser);

    return ResponseEntity.ok(jwtToken);
  }
}
