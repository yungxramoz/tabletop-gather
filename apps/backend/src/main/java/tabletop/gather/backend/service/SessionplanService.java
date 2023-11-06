package tabletop.gather.backend.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.domain.Sessionplan;
import tabletop.gather.backend.domain.User;
import tabletop.gather.backend.model.SessionplanDTO;
import tabletop.gather.backend.repos.SessionplanRepository;
import tabletop.gather.backend.repos.UserRepository;
import tabletop.gather.backend.util.NotFoundException;


@Service
public class SessionplanService {

    private final SessionplanRepository sessionplanRepository;
    private final UserRepository userRepository;

    public SessionplanService(final SessionplanRepository sessionplanRepository,
            final UserRepository userRepository) {
        this.sessionplanRepository = sessionplanRepository;
        this.userRepository = userRepository;
    }

    public List<SessionplanDTO> findAll() {
        final List<Sessionplan> sessionplans = sessionplanRepository.findAll(Sort.by("id"));
        return sessionplans.stream()
                .map(sessionplan -> mapToDTO(sessionplan, new SessionplanDTO()))
                .toList();
    }

    public SessionplanDTO get(final UUID id) {
        return sessionplanRepository.findById(id)
                .map(sessionplan -> mapToDTO(sessionplan, new SessionplanDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final SessionplanDTO sessionplanDTO) {
        final Sessionplan sessionplan = new Sessionplan();
        mapToEntity(sessionplanDTO, sessionplan);
        return sessionplanRepository.save(sessionplan).getId();
    }

    public void update(final UUID id, final SessionplanDTO sessionplanDTO) {
        final Sessionplan sessionplan = sessionplanRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(sessionplanDTO, sessionplan);
        sessionplanRepository.save(sessionplan);
    }

    public void delete(final UUID id) {
        sessionplanRepository.deleteById(id);
    }

    private SessionplanDTO mapToDTO(final Sessionplan sessionplan,
            final SessionplanDTO sessionplanDTO) {
        sessionplanDTO.setId(sessionplan.getId());
        sessionplanDTO.setName(sessionplan.getName());
        sessionplanDTO.setUser(sessionplan.getUser() == null ? null : sessionplan.getUser().getId());
        return sessionplanDTO;
    }

    private Sessionplan mapToEntity(final SessionplanDTO sessionplanDTO,
            final Sessionplan sessionplan) {
        sessionplan.setName(sessionplanDTO.getName());
        final User user = sessionplanDTO.getUser() == null ? null : userRepository.findById(sessionplanDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        sessionplan.setUser(user);
        return sessionplan;
    }

}
