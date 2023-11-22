package tabletop.gather.backend.unit.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import tabletop.gather.backend.user.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserServiceTest {

  @InjectMocks
  private UserService userService;

  @Mock
  private UserRepository userRepository;

  @Mock
  private AuthenticationManager authenticationManager;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testFindAll() {
    User user1 = new User();
    User user2 = new User();
    when(userRepository.findAll(any(Sort.class))).thenReturn(List.of(user1, user2));

    List<UserDto> users = userService.findAll();

    assertEquals(2, users.size());
    verify(userRepository, times(1)).findAll(any(Sort.class));
  }

  @Test
  public void testGetByEmail() {
    User user = new User();
    when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

    UserDto userDto = userService.getByEmail("test@test.com");

    assertEquals(user.getEmail(), userDto.getEmail());
    verify(userRepository, times(1)).findByEmail(anyString());
  }

  @Test
  public void testGet() {
    User user = new User();
    UUID id = UUID.randomUUID();
    when(userRepository.findById(any(UUID.class))).thenReturn(Optional.of(user));

    UserDto userDto = userService.get(id);

    assertEquals(user.getId(), userDto.getId());
    verify(userRepository, times(1)).findById(any(UUID.class));
  }

  @Test
  public void testUpdate() {
    User user = new User();
    UserUpdateDto userUpdateDto = new UserUpdateDto();
    when(userRepository.findById(any(UUID.class))).thenReturn(Optional.of(user));
    when(userRepository.save(any(User.class))).thenReturn(user);

    User updatedUser = userService.update(UUID.randomUUID(), userUpdateDto, "test@test.com");

    assertEquals(user, updatedUser);
    verify(userRepository, times(1)).findById(any(UUID.class));
    verify(userRepository, times(1)).save(any(User.class));
  }

  @Test
  public void testDelete() {
    UUID id = UUID.randomUUID();
    userService.delete(id);

    verify(userRepository, times(1)).deleteById(any(UUID.class));
  }

  @Test
  public void testUpdatePassword() {
    User user = new User();
    PasswordUpdateDto passwordUpdateDto = new PasswordUpdateDto();
    when(userRepository.findById(any(UUID.class))).thenReturn(Optional.of(user));
    when(userRepository.save(any(User.class))).thenReturn(user);

    User updatedUser = userService.updatePassword(UUID.randomUUID(), passwordUpdateDto);

    assertEquals(user, updatedUser);
    verify(userRepository, times(1)).findById(any(UUID.class));
    verify(userRepository, times(1)).save(any(User.class));
  }
}
