package tabletop.gather.backend.user;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tabletop.gather.backend.jwt.JwtDto;
import tabletop.gather.backend.jwt.JwtService;

@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserResource {

  private final UserService userService;
  private JwtService jwtService;

  public UserResource(final UserService userService, final JwtService jwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  /**
   * Returns all users.
   * @return List of all users
   */
  @GetMapping
  public ResponseEntity<List<UserDto>> getAllUsers() {
    return ResponseEntity.ok(userService.findAll());
  }

  /**
   * Returns the user with the given id.
   * @param id
   * @return UserDto with the given id
   */
  @GetMapping("/{id}")
  public ResponseEntity<UserDto> getUser(@PathVariable(name = "id") final UUID id) {
    return ResponseEntity.ok(userService.get(id));
  }

  /**
   * Updates the authenticated user.
   * @param token
   * @param userDTO
   * @return JWT token
   */
  @PutMapping("/me")
  public ResponseEntity<JwtDto> updateAuthenticatedUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                                                       @RequestBody @Valid final UserUpdateDto userDTO) {
    UserDto user = getUserByToken(token);
    User updatedUser = userService.update(user.getId(), userDTO);
    JwtDto jwtToken = getJwtToken(updatedUser);

    return ResponseEntity.ok(jwtToken);
  }

  /**
   * Deletes the authenticated user.
   * @param token
   * @return 204
   */
  @DeleteMapping("/me")
  @ApiResponse(responseCode = "204")
  public ResponseEntity<Void> deleteAuthenticatedUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
    UserDto user = getUserByToken(token);
    userService.delete(user.getId());
    return ResponseEntity.noContent().build();
  }

  /**
   * Returns the authenticated user.
   * @param token
   * @return UserDto of the authenticated user
   */
  @GetMapping("/me")
  @ApiResponse(responseCode = "200")
  public ResponseEntity<UserDto> getAuthenticatedUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
    UserDto user = getUserByToken(token);
    return ResponseEntity.ok(user);
  }

  /**
   * Updates the password of the authenticated user.
   * @param passwordUpdateDto
   * @param token
   * @return JWT token
   */
  @PutMapping("/me/password")
  @ApiResponse(responseCode = "200")
  public ResponseEntity<JwtDto> updatePassword(@RequestBody @Valid final PasswordUpdateDto passwordUpdateDto,
                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
    UserDto user = getUserByToken(token);
    User newUser = userService.updatePassword(user.getId(), passwordUpdateDto);

    JwtDto jwtToken = getJwtToken(newUser);

    return ResponseEntity.ok(jwtToken);
  }

  private UserDto getUserByToken(String token) {
    String email = jwtService.extractUsername(token);
    return userService.getByEmail(email);
  }

  private JwtDto getJwtToken(User user) {
    JwtDto jwtToken = new JwtDto();
    jwtToken.setToken(jwtService.generateToken(user));
    jwtToken.setExpiresIn(jwtService.getExpirationTime());
    return jwtToken;
  }
}
