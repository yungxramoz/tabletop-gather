package tabletop.gather.backend.plan;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.game.Game;
import tabletop.gather.backend.game.GameRepository;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserRepository;
import tabletop.gather.backend.util.NotFoundException;

import java.util.List;
import java.util.UUID;


@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public PlanService(final PlanRepository planRepository, final UserRepository userRepository,
            final GameRepository gameRepository) {
        this.planRepository = planRepository;
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }

    public List<PlanDTO> findAll() {
        final List<Plan> plans = planRepository.findAll(Sort.by("id"));
        return plans.stream()
                .map(plan -> mapToDTO(plan, new PlanDTO()))
                .toList();
    }

    public PlanDTO get(final UUID id) {
        return planRepository.findById(id)
                .map(plan -> mapToDTO(plan, new PlanDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final PlanDTO planDTO) {
        final Plan plan = new Plan();
        mapToEntity(planDTO, plan);
        return planRepository.save(plan).getId();
    }

    public void update(final UUID id, final PlanDTO planDTO) {
        final Plan plan = planRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(planDTO, plan);
        planRepository.save(plan);
    }

    public void delete(final UUID id) {
        planRepository.deleteById(id);
    }

    private PlanDTO mapToDTO(final Plan plan, final PlanDTO planDTO) {
        planDTO.setId(plan.getId());
        planDTO.setName(plan.getName());
        planDTO.setIsPrivate(plan.getIsPrivate());
        planDTO.setUser(plan.getUser() == null ? null : plan.getUser().getId());
        planDTO.setGame(plan.getGame() == null ? null : plan.getGame().getId());
        return planDTO;
    }

    private Plan mapToEntity(final PlanDTO planDTO, final Plan plan) {
        plan.setName(planDTO.getName());
        plan.setIsPrivate(planDTO.getIsPrivate());
        final User user = planDTO.getUser() == null ? null : userRepository.findById(planDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        plan.setUser(user);
        final Game game = planDTO.getGame() == null ? null : gameRepository.findById(planDTO.getGame())
                .orElseThrow(() -> new NotFoundException("game not found"));
        plan.setGame(game);
        return plan;
    }

}
