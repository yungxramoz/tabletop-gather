package tabletop.gather.backend.user;

import java.util.List;
import java.util.UUID;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.util.NotFoundException;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
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

    public void update(final UUID id, final UserDto userDTO) {
        final User user = userRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    public void delete(final UUID id) {
        userRepository.deleteById(id);
    }

    private UserDto mapToDTO(final User user, final UserDto userDTO) {
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
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
