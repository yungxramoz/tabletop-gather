package tabletop.gather.backend.unit.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tabletop.gather.backend.auth.AuthenticationService;
import tabletop.gather.backend.jwt.JwtDto;
import tabletop.gather.backend.jwt.JwtService;
import tabletop.gather.backend.user.*;

public class UserResourceTest {

  @InjectMocks private UserResource userResource;

  @Mock private UserService userService;

  @Mock private JwtService jwtService;

  @Mock AuthenticationService authenticationService;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testGetAllUsers() {
    UserDto userDto1 = new UserDto();
    UserDto userDto2 = new UserDto();
    when(userService.findAll()).thenReturn(List.of(userDto1, userDto2));

    ResponseEntity<List<UserDto>> response = userResource.getAllUsers();

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(List.of(userDto1, userDto2), response.getBody());
  }

  @Test
  public void testGetUser() {
    UUID id = UUID.randomUUID();
    UserDto userDto = new UserDto();
    when(userService.get(id)).thenReturn(userDto);

    ResponseEntity<UserDto> response = userResource.getUser(id);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(userDto, response.getBody());
  }

  @Test
  public void testUpdateAuthenticatedUser() {
    String token = "token";
    UserUpdateDto userUpdateDto = new UserUpdateDto();
    UserDto userDto = new UserDto();
    User user = new User();
    JwtDto jwtDto = new JwtDto();
    jwtDto.setToken("newToken");
    jwtDto.setExpiresIn(3600L);
    when(userService.getByEmail(userDto.getEmail())).thenReturn(userDto);
    when(userService.update(userDto.getId(), userUpdateDto, userDto.getEmail())).thenReturn(user);
    when(jwtService.getUserByToken(token)).thenReturn(userDto);
    when(jwtService.getNewJwtToken(user)).thenReturn(jwtDto);

    ResponseEntity<JwtDto> response = userResource.updateAuthenticatedUser(token, userUpdateDto);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(jwtDto.getToken(), response.getBody().getToken());
    assertEquals(jwtDto.getExpiresIn(), response.getBody().getExpiresIn());
    verify(authenticationService, times(1)).verifyEmailPassword(any(), any());
  }

  @Test
  public void testDeleteAuthenticatedUser() {
    String token = "token";
    UserDto userDto = new UserDto();
    when(jwtService.getUserByToken(token)).thenReturn(userDto);
    when(userService.getByEmail(userDto.getEmail())).thenReturn(userDto);

    ResponseEntity<Void> response = userResource.deleteAuthenticatedUser(token);

    assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
  }

  @Test
  public void testGetAuthenticatedUser() {
    String token = "token";
    UserDto userDto = new UserDto();
    when(jwtService.getUserByToken(token)).thenReturn(userDto);
    when(userService.getByEmail(userDto.getEmail())).thenReturn(userDto);

    ResponseEntity<UserDto> response = userResource.getAuthenticatedUser(token);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(userDto, response.getBody());
  }

  @Test
  public void testGetUsersByPlanId() {
    UUID planId = UUID.randomUUID();
    UserPlanDto userPlanDto = new UserPlanDto();
    userPlanDto.setFullName("fullName");
    when(userService.findByPlanId(planId)).thenReturn(Arrays.asList(userPlanDto));

    ResponseEntity<List<UserPlanDto>> response = userResource.getUsersByPlanId(planId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(1, response.getBody().size());
    assertEquals(userPlanDto.getFullName(), response.getBody().get(0).getFullName());
    verify(userService, times(1)).findByPlanId(planId);
  }

  @Test
  public void testUpdatePassword() {
    String token = "token";
    PasswordUpdateDto passwordUpdateDto = new PasswordUpdateDto();
    UserDto userDto = new UserDto();
    User user = new User();
    JwtDto jwtDto = new JwtDto();
    jwtDto.setToken("newToken");
    jwtDto.setExpiresIn(3600L);
    when(jwtService.getUserByToken(token)).thenReturn(userDto);
    when(jwtService.getNewJwtToken(user)).thenReturn(jwtDto);
    when(userService.getByEmail(userDto.getEmail())).thenReturn(userDto);
    when(userService.updatePassword(userDto.getId(), passwordUpdateDto)).thenReturn(user);

    ResponseEntity<JwtDto> response = userResource.updatePassword(passwordUpdateDto, token);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(jwtDto.getToken(), response.getBody().getToken());
    assertEquals(jwtDto.getExpiresIn(), response.getBody().getExpiresIn());
    verify(authenticationService, times(1)).verifyEmailPassword(any(), any());
  }
}
