package tabletop.gather.backend.user;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.gathering.DateTimeGatheringDto;
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
   * @return all users as Dto
   */
  public List<UserDto> findAll() {
    final List<User> users = userRepository.findAll(Sort.by("id"));
    return users.stream().map(user -> mapToDto(user, new UserDto())).toList();
  }

  /**
   * Returns the user with the given id.
   *
   * @param id the id of the user to return
   * @return the user dto with the given id
   */
  public UserDto get(final UUID id) {
    return userRepository
        .findById(id)
        .map(user -> mapToDto(user, new UserDto()))
        .orElseThrow(() -> new NotFoundException("user not found"));
  }

  /**
   * Returns the user with the given email.
   *
   * @param email the email of the user to return
   * @return the user dto with the given email
   */
  public UserDto getByEmail(final String email) {
    return userRepository
        .findByEmail(email)
        .map(user -> mapToDto(user, new UserDto()))
        .orElseThrow(() -> new NotFoundException("user not found"));
  }

  /**
   * Gets all users attending the plan with the given id.
   *
   * @param id the id of the plan
   * @return the list of users attending the plan
   */
  public List<UserPlanDto> findByPlanId(final UUID id) {
    final List<User> users = userRepository.findByGatheringsPlanId(id);
    return users.stream().map(user -> mapToDto(user, id, new UserPlanDto())).toList();
  }

  /**
   * Updates the user with the given id.
   *
   * @param id the id of the user to update
   * @param userDto the user Dto containing the updated values
   * @param currentEmail the current email of the user
   * @return the updated user entity
   */
  public User update(final UUID id, final UserUpdateDto userDto, final String currentEmail) {
    final User user =
        userRepository.findById(id).orElseThrow(() -> new NotFoundException("user not found"));
    mapToEntity(userDto, user);
    userRepository.save(user);
    return user;
  }

  /**
   * Deletes the user with the given id.
   *
   * @param id the id of the user to delete
   */
  public void delete(final UUID id) {
    userRepository.deleteById(id);
  }

  /**
   * Updates the password of the user with the given id.
   *
   * @param id the id of the user to update
   * @param passwordUpdateDto the password update Dto containing the updated password
   * @return the updated user entity
   */
  public User updatePassword(final UUID id, final PasswordUpdateDto passwordUpdateDto) {
    final User user =
        userRepository.findById(id).orElseThrow(() -> new NotFoundException("user not found"));
    user.setPasswordHash(passwordEncoder.encode(passwordUpdateDto.getNewPassword()));
    userRepository.save(user);
    return user;
  }

  /**
   * Maps entity to Dto.
   *
   * @param user the user entity to map
   * @param userDto the user Dto to map to
   * @return the mapped user entity
   */
  public UserDto mapToDto(final User user, final UserDto userDto) {
    userDto.setId(user.getId());
    userDto.setUsername(user.getNonUserDetailsUsername());
    userDto.setFirstName(user.getFirstName());
    userDto.setLastName(user.getLastName());
    userDto.setEmail(user.getEmail());
    return userDto;
  }

  private UserPlanDto mapToDto(final User user, final UUID planId, final UserPlanDto userPlanDto) {
    userPlanDto.setFullName(String.format("%s %s", user.getFirstName(), user.getLastName()));
    final List<DateTimeGatheringDto> gatheringsDto =
        user.getGatherings().stream()
            .filter(gathering -> gathering.getPlan().getId().equals(planId))
            .map(
                gathering -> {
                  DateTimeGatheringDto dto = new DateTimeGatheringDto();
                  dto.setStartTime(gathering.getStartTime());
                  dto.setDate(gathering.getDate());
                  return dto;
                })
            .toList();
    userPlanDto.setAttendingGatherings(gatheringsDto);
    return userPlanDto;
  }

  private User mapToEntity(final UserDto userDto, final User user) {
    user.setUsername(userDto.getUsername());
    user.setFirstName(userDto.getFirstName());
    user.setLastName(userDto.getLastName());
    user.setEmail(userDto.getEmail());
    return user;
  }
}
