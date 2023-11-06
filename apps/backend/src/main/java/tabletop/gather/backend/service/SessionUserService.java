package tabletop.gather.backend.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.domain.SessionUser;
import tabletop.gather.backend.model.SessionUserDTO;
import tabletop.gather.backend.repos.SessionUserRepository;
import tabletop.gather.backend.util.NotFoundException;


@Service
public class SessionUserService {

    private final SessionUserRepository sessionUserRepository;

    public SessionUserService(final SessionUserRepository sessionUserRepository) {
        this.sessionUserRepository = sessionUserRepository;
    }

    public List<SessionUserDTO> findAll() {
        final List<SessionUser> sessionUsers = sessionUserRepository.findAll(Sort.by("id"));
        return sessionUsers.stream()
                .map(sessionUser -> mapToDTO(sessionUser, new SessionUserDTO()))
                .toList();
    }

    public SessionUserDTO get(final Long id) {
        return sessionUserRepository.findById(id)
                .map(sessionUser -> mapToDTO(sessionUser, new SessionUserDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final SessionUserDTO sessionUserDTO) {
        final SessionUser sessionUser = new SessionUser();
        mapToEntity(sessionUserDTO, sessionUser);
        return sessionUserRepository.save(sessionUser).getId();
    }

    public void update(final Long id, final SessionUserDTO sessionUserDTO) {
        final SessionUser sessionUser = sessionUserRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(sessionUserDTO, sessionUser);
        sessionUserRepository.save(sessionUser);
    }

    public void delete(final Long id) {
        sessionUserRepository.deleteById(id);
    }

    private SessionUserDTO mapToDTO(final SessionUser sessionUser,
            final SessionUserDTO sessionUserDTO) {
        sessionUserDTO.setId(sessionUser.getId());
        return sessionUserDTO;
    }

    private SessionUser mapToEntity(final SessionUserDTO sessionUserDTO,
            final SessionUser sessionUser) {
        return sessionUser;
    }

}
