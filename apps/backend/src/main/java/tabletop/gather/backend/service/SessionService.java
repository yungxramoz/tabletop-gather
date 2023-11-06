package tabletop.gather.backend.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.domain.Session;
import tabletop.gather.backend.domain.Sessionplan;
import tabletop.gather.backend.model.SessionDTO;
import tabletop.gather.backend.repos.SessionRepository;
import tabletop.gather.backend.repos.SessionplanRepository;
import tabletop.gather.backend.util.NotFoundException;


@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final SessionplanRepository sessionplanRepository;

    public SessionService(final SessionRepository sessionRepository,
            final SessionplanRepository sessionplanRepository) {
        this.sessionRepository = sessionRepository;
        this.sessionplanRepository = sessionplanRepository;
    }

    public List<SessionDTO> findAll() {
        final List<Session> sessions = sessionRepository.findAll(Sort.by("id"));
        return sessions.stream()
                .map(session -> mapToDTO(session, new SessionDTO()))
                .toList();
    }

    public SessionDTO get(final UUID id) {
        return sessionRepository.findById(id)
                .map(session -> mapToDTO(session, new SessionDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final SessionDTO sessionDTO) {
        final Session session = new Session();
        mapToEntity(sessionDTO, session);
        return sessionRepository.save(session).getId();
    }

    public void update(final UUID id, final SessionDTO sessionDTO) {
        final Session session = sessionRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(sessionDTO, session);
        sessionRepository.save(session);
    }

    public void delete(final UUID id) {
        sessionRepository.deleteById(id);
    }

    private SessionDTO mapToDTO(final Session session, final SessionDTO sessionDTO) {
        sessionDTO.setId(session.getId());
        sessionDTO.setDate(session.getDate());
        sessionDTO.setStartTime(session.getStartTime());
        sessionDTO.setEndTime(session.getEndTime());
        sessionDTO.setSessionplan(session.getSessionplan() == null ? null : session.getSessionplan().getId());
        return sessionDTO;
    }

    private Session mapToEntity(final SessionDTO sessionDTO, final Session session) {
        session.setDate(sessionDTO.getDate());
        session.setStartTime(sessionDTO.getStartTime());
        session.setEndTime(sessionDTO.getEndTime());
        final Sessionplan sessionplan = sessionDTO.getSessionplan() == null ? null : sessionplanRepository.findById(sessionDTO.getSessionplan())
                .orElseThrow(() -> new NotFoundException("sessionplan not found"));
        session.setSessionplan(sessionplan);
        return session;
    }

}
