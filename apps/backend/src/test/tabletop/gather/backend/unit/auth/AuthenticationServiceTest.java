package tabletop.gather.backend.unit.auth;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import tabletop.gather.backend.auth.*;
import tabletop.gather.backend.user.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthenticationServiceTest {

  @InjectMocks
  private AuthenticationService authenticationService;

  @Mock
  private UserRepository userRepository;

  @Mock
  private UserService userService;

  @Mock
  private AuthenticationManager authenticationManager;

  @Mock
  private PasswordEncoder passwordEncoder;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testIsEmailTaken() {
    when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new User()));

    boolean isEmailTaken = authenticationService.isEmailTaken("test@test.com");

    assertTrue(isEmailTaken);
    verify(userRepository, times(1)).findByEmail(anyString());
  }

  @Test
  public void testSignup() {
    RegisterUserDto registerUserDto = new RegisterUserDto();
    registerUserDto.setUsername("test");
    registerUserDto.setFirstName("test");
    registerUserDto.setLastName("test");
    registerUserDto.setEmail("test@test.com");
    registerUserDto.setPassword("test");
    User user = new User();
    when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
    when(userRepository.save(any(User.class))).thenReturn(user);
    when(userService.mapToDTO(any(User.class), any(UserDto.class))).thenReturn(new UserDto());

    UserDto userDto = authenticationService.signup(registerUserDto);

    assertNotNull(userDto);
    verify(passwordEncoder, times(1)).encode(anyString());
    verify(userRepository, times(1)).save(any(User.class));
    verify(userService, times(1)).mapToDTO(any(User.class), any(UserDto.class));
  }

  @Test
  public void testAuthenticate() {
    LoginUserDto loginUserDto = new LoginUserDto();
    loginUserDto.setEmail("test@test.com");
    loginUserDto.setPassword("test");
    User user = new User();
    when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

    User authenticatedUser = authenticationService.authenticate(loginUserDto);

    assertEquals(user, authenticatedUser);
    verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
    verify(userRepository, times(1)).findByEmail(anyString());
  }

  @Test
  public void testVerifyEmailPassword() {
    String email = "test@test.ch";
    String password = "test";
    User user = new User();
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(password));
    when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
    when(passwordEncoder.matches(password, user.getPasswordHash())).thenReturn(true);

    authenticationService.verifyEmailPassword(email, password);

    verify(userRepository, times(1)).findByEmail(email);
    verify(passwordEncoder, times(1)).matches(password, user.getPasswordHash());
  }
}
