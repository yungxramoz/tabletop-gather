package tabletop.gather.backend.user;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.util.NotFoundException;

@Service
public class UserService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  public UserService(final UserRepository userRepository, final PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  /**
   * Gets all users.
   *
   * @return all users as DTO
   */
  public List<UserDto> findAll() {
    final List<User> users = userRepository.findAll(Sort.by("id"));
    return users.stream()
        .map(user -> mapToDTO(user, new UserDto()))
        .toList();
  }

  /**
   * Returns the user with the given email.
   *
   * @param email the email of the user to return
   * @return the user dto with the given email
   */
  public UserDto getByEmail(final String email) {
    return userRepository.findByEmail(email)
        .map(user -> mapToDTO(user, new UserDto()))
        .orElseThrow(NotFoundException::new);
  }

  /**
   * Returns the user with the given id.
   *
   * @param id the id of the user to return
   * @return the user dto with the given id
   */
  public UserDto get(final UUID id) {
    return userRepository.findById(id)
        .map(user -> mapToDTO(user, new UserDto()))
        .orElseThrow(NotFoundException::new);
  }

  /**
   * Updates the user with the given id.
   *
   * @param id           the id of the user to update
   * @param userDTO      the user DTO containing the updated values
   * @param currentEmail the current email of the user
   * @return the updated user entity
   */
  public User update(final UUID id, final UserUpdateDto userDTO, final String currentEmail) {
    final User user = userRepository.findById(id)
        .orElseThrow(NotFoundException::new);
    mapToEntity(userDTO, user);
    userRepository.save(user);
    return user;
  }

  /**
   * Deletes the user with the given id.
   *
   * @param id
   */
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
    final User user = userRepository.findById(id)
        .orElseThrow(NotFoundException::new);
    user.setPasswordHash(passwordEncoder.encode(passwordUpdateDto.getNewPassword()));
    userRepository.save(user);
    return user;
  }

  /**
   * Maps entity to DTO.
   *
   * @param user    the user entity to map
   * @param userDTO the user DTO to map to
   * @return the mapped user entity
   */
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
