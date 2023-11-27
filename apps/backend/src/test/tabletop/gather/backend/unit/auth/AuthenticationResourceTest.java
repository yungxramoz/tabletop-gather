package tabletop.gather.backend.unit.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tabletop.gather.backend.auth.AuthenticationResource;
import tabletop.gather.backend.auth.AuthenticationService;
import tabletop.gather.backend.auth.LoginUserDto;
import tabletop.gather.backend.auth.RegisterUserDto;
import tabletop.gather.backend.jwt.JwtDto;
import tabletop.gather.backend.jwt.JwtService;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserDto;

public class AuthenticationResourceTest {

  @InjectMocks private AuthenticationResource authenticationResource;

  @Mock private JwtService jwtService;

  @Mock private AuthenticationService authenticationService;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testRegister() {
    RegisterUserDto registerUserDto = new RegisterUserDto();
    registerUserDto.setEmail("mock@mock.ch");
    registerUserDto.setPassword("mock");
    UserDto userDto = new UserDto();
    userDto.setId(UUID.randomUUID());
    when(authenticationService.signup(registerUserDto)).thenReturn(userDto);

    ResponseEntity<UserDto> response = authenticationResource.register(registerUserDto);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(userDto, response.getBody());
  }

  @Test
  public void testAuthenticate() {
    LoginUserDto loginUserDto = new LoginUserDto();
    User user = new User();
    JwtDto jwtDto = new JwtDto();
    jwtDto.setToken("token");
    jwtDto.setExpiresIn(3600L);
    when(authenticationService.authenticate(loginUserDto)).thenReturn(user);
    when(jwtService.generateToken(user)).thenReturn(jwtDto.getToken());
    when(jwtService.getExpirationTime()).thenReturn(jwtDto.getExpiresIn());

    ResponseEntity<JwtDto> response = authenticationResource.authenticate(loginUserDto);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(jwtDto.getToken(), response.getBody().getToken());
    assertEquals(jwtDto.getExpiresIn(), response.getBody().getExpiresIn());
  }
}
