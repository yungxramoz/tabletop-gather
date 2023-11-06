package tabletop.gather.backend.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.domain.SessionUser;
import tabletop.gather.backend.domain.User;
import tabletop.gather.backend.model.UserDTO;
import tabletop.gather.backend.repos.SessionUserRepository;
import tabletop.gather.backend.repos.UserRepository;
import tabletop.gather.backend.util.NotFoundException;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final SessionUserRepository sessionUserRepository;

    public UserService(final UserRepository userRepository,
            final SessionUserRepository sessionUserRepository) {
        this.userRepository = userRepository;
        this.sessionUserRepository = sessionUserRepository;
    }

    public List<UserDTO> findAll() {
        final List<User> users = userRepository.findAll(Sort.by("id"));
        return users.stream()
                .map(user -> mapToDTO(user, new UserDTO()))
                .toList();
    }

    public UserDTO get(final UUID id) {
        return userRepository.findById(id)
                .map(user -> mapToDTO(user, new UserDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final UserDTO userDTO) {
        final User user = new User();
        mapToEntity(userDTO, user);
        return userRepository.save(user).getId();
    }

    public void update(final UUID id, final UserDTO userDTO) {
        final User user = userRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    public void delete(final UUID id) {
        userRepository.deleteById(id);
    }

    private UserDTO mapToDTO(final User user, final UserDTO userDTO) {
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setPasswordHash(user.getPasswordHash());
        userDTO.setPasswordSalt(user.getPasswordSalt());
        userDTO.setSessionUser(user.getSessionUser() == null ? null : user.getSessionUser().getId());
        return userDTO;
    }

    private User mapToEntity(final UserDTO userDTO, final User user) {
        user.setUsername(userDTO.getUsername());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPasswordHash(userDTO.getPasswordHash());
        user.setPasswordSalt(userDTO.getPasswordSalt());
        final SessionUser sessionUser = userDTO.getSessionUser() == null ? null : sessionUserRepository.findById(userDTO.getSessionUser())
                .orElseThrow(() -> new NotFoundException("sessionUser not found"));
        user.setSessionUser(sessionUser);
        return user;
    }

}
