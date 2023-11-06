package tabletop.gather.backend.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.domain.AnonymousUser;
import tabletop.gather.backend.model.AnonymousUserDTO;
import tabletop.gather.backend.repos.AnonymousUserRepository;
import tabletop.gather.backend.util.NotFoundException;


@Service
public class AnonymousUserService {

    private final AnonymousUserRepository anonymousUserRepository;

    public AnonymousUserService(final AnonymousUserRepository anonymousUserRepository) {
        this.anonymousUserRepository = anonymousUserRepository;
    }

    public List<AnonymousUserDTO> findAll() {
        final List<AnonymousUser> anonymousUsers = anonymousUserRepository.findAll(Sort.by("id"));
        return anonymousUsers.stream()
                .map(anonymousUser -> mapToDTO(anonymousUser, new AnonymousUserDTO()))
                .toList();
    }

    public AnonymousUserDTO get(final Long id) {
        return anonymousUserRepository.findById(id)
                .map(anonymousUser -> mapToDTO(anonymousUser, new AnonymousUserDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final AnonymousUserDTO anonymousUserDTO) {
        final AnonymousUser anonymousUser = new AnonymousUser();
        mapToEntity(anonymousUserDTO, anonymousUser);
        return anonymousUserRepository.save(anonymousUser).getId();
    }

    public void update(final Long id, final AnonymousUserDTO anonymousUserDTO) {
        final AnonymousUser anonymousUser = anonymousUserRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(anonymousUserDTO, anonymousUser);
        anonymousUserRepository.save(anonymousUser);
    }

    public void delete(final Long id) {
        anonymousUserRepository.deleteById(id);
    }

    private AnonymousUserDTO mapToDTO(final AnonymousUser anonymousUser,
            final AnonymousUserDTO anonymousUserDTO) {
        anonymousUserDTO.setId(anonymousUser.getId());
        anonymousUserDTO.setName(anonymousUser.getName());
        return anonymousUserDTO;
    }

    private AnonymousUser mapToEntity(final AnonymousUserDTO anonymousUserDTO,
            final AnonymousUser anonymousUser) {
        anonymousUser.setName(anonymousUserDTO.getName());
        return anonymousUser;
    }

}
