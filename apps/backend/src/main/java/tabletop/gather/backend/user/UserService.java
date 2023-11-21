package tabletop.gather.backend.user;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.util.NotFoundException;


@Service
public class UserService {

  private final UserRepository userRepository;

  private final AuthenticationManager authenticationManager;

  public UserService(final UserRepository userRepository, final AuthenticationManager authenticationManager) {
    this.userRepository = userRepository;
    this.authenticationManager = authenticationManager;
  }

  public List<UserDto> findAll() {
    final List<User> users = userRepository.findAll(Sort.by("id"));
    return users.stream()
      .map(user -> mapToDTO(user, new UserDto()))
      .toList();
  }

  public Optional<UserDto> findByEmail(final String email) {
    return userRepository.findByEmail(email)
      .map(user -> mapToDTO(user, new UserDto()));
  }

  public UserDto getByEmail(final String email) {
    return userRepository.findByEmail(email)
      .map(user -> mapToDTO(user, new UserDto()))
      .orElseThrow(NotFoundException::new);
  }

  public UserDto get(final UUID id) {
    return userRepository.findById(id)
      .map(user -> mapToDTO(user, new UserDto()))
      .orElseThrow(NotFoundException::new);
  }

  // TODO: Delete this - we create users via the registration process
  public UUID create(final UserDto userDTO) {
    final User user = new User();
    mapToEntity(userDTO, user);
    return userRepository.save(user).getId();
  }

  /**
   * Updates the user with the given id.
   * @param id
   * @param userDTO
   * @return the updated user entity
   */
  public User update(final UUID id, final UserUpdateDto userDTO) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
      userDTO.getEmail(),
      userDTO.getPassword()
    ));

    final User user = userRepository.findById(id)
      .orElseThrow(NotFoundException::new);
    mapToEntity(userDTO, user);
    userRepository.save(user);
    return user;
  }

  public void delete(final UUID id) {
    userRepository.deleteById(id);
  }

  /**
   * Updates the password of the user with the given id.
   *
   * @param id
   * @param passwordUpdateDto
   * @return the updated user entity
   */
  public User updatePassword(final UUID id, final PasswordUpdateDto passwordUpdateDto) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
      passwordUpdateDto.getEmail(),
      passwordUpdateDto.getPassword()
    ));

    final User user = userRepository.findById(id)
      .orElseThrow(NotFoundException::new);
    user.setPasswordHash(passwordUpdateDto.getPassword());
    userRepository.save(user);
    return user;
  }

  public UserDto mapToDTO(final User user, final UserDto userDTO) {
    userDTO.setId(user.getId());
    userDTO.setUsername(user.getNonUserDetailsUsername());
    userDTO.setFirstName(user.getFirstName());
    userDTO.setLastName(user.getLastName());
    userDTO.setEmail(user.getEmail());
    return userDTO;
  }

  private User mapToEntity(final UserDto userDTO, final User user) {
    user.setUsername(userDTO.getUsername());
    user.setFirstName(userDTO.getFirstName());
    user.setLastName(userDTO.getLastName());
    user.setEmail(userDTO.getEmail());
    return user;
  }

}
