package tabletop.gather.backend.plan;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.game.Game;
import tabletop.gather.backend.game.GameRepository;
import tabletop.gather.backend.gathering.CreateGatheringDto;
import tabletop.gather.backend.gathering.Gathering;
import tabletop.gather.backend.gathering.GatheringRepository;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserRepository;
import tabletop.gather.backend.util.NotFoundException;

import java.util.*;

@Service
public class PlanService {

  private final PlanRepository planRepository;
  private final UserRepository userRepository;
  private final GameRepository gameRepository;

  private final GatheringRepository gatheringRepository;

  public PlanService(final PlanRepository planRepository, final UserRepository userRepository,
                     final GameRepository gameRepository, final GatheringRepository gatheringRepository) {
    this.planRepository = planRepository;
    this.userRepository = userRepository;
    this.gameRepository = gameRepository;
    this.gatheringRepository = gatheringRepository;
  }

  public List<PlanDto> findAll() {
    final List<Plan> plans = planRepository.findAll(Sort.by("id"));
    return plans.stream()
      .map(plan -> mapToDTO(plan, new PlanDto()))
      .toList();
  }

  public PlanDto get(final UUID id) {
    return planRepository.findById(id)
      .map(plan -> mapToDTO(plan, new PlanDto()))
      .orElseThrow(NotFoundException::new);
  }

  public UUID create(final CreatePlanDto planDTO, final UUID userId) {
    final Plan plan = new Plan();
    mapToEntity(planDTO, plan);
    plan.setUser(userRepository.findById(userId)
      .orElseThrow(() -> new NotFoundException("user not found")));
    return planRepository.save(plan).getId();
  }

  public void update(final UUID id, final PlanDto planDTO) {
    final Plan plan = planRepository.findById(id)
      .orElseThrow(NotFoundException::new);
    mapToEntity(planDTO, plan);
    planRepository.save(plan);
  }

  public void delete(final UUID id) {
    planRepository.deleteById(id);
  }

  private PlanDto mapToDTO(final Plan plan, final PlanDto planDTO) {
    planDTO.setId(plan.getId());
    planDTO.setName(plan.getName());
    planDTO.setIsPrivate(plan.getIsPrivate());
    planDTO.setDescription(plan.getDescription());
    planDTO.setPlayerLimit(plan.getPlayerLimit());
    planDTO.setUser(plan.getUser() == null ? null : plan.getUser().getId());
    planDTO.setGame(plan.getGame() == null ? null : plan.getGame().getId());
    return planDTO;
  }

  private Plan mapToEntity(final PlanDto planDTO, final Plan plan) {
    plan.setName(planDTO.getName());
    plan.setIsPrivate(planDTO.getIsPrivate());
    plan.setDescription(planDTO.getDescription());
    plan.setPlayerLimit(planDTO.getPlayerLimit());
    final User user = planDTO.getUser() == null ? null
      : userRepository.findById(planDTO.getUser())
      .orElseThrow(() -> new NotFoundException("user not found"));
    plan.setUser(user);
    final Game game = planDTO.getGame() == null ? null
      : gameRepository.findById(planDTO.getGame())
      .orElseThrow(() -> new NotFoundException("game not found"));
    plan.setGame(game);
    return plan;
  }

  private Plan mapToEntity(final CreatePlanDto planDto, final Plan plan) {
    plan.setName(planDto.getName());
    plan.setIsPrivate(planDto.getIsPrivate());
    plan.setDescription(planDto.getDescription());
    plan.setPlayerLimit(planDto.getPlayerLimit());
    final Game game = planDto.getGameId() == null ? null
      : gameRepository.findById(planDto.getGameId())
      .orElseThrow(() -> new NotFoundException("game not found"));
    plan.setGame(game);
    Set<Gathering> gatherings = new HashSet<>();
    planDto.getGatherings().forEach(gatheringDto -> {
      Gathering gathering = new Gathering();
      gathering.setPlan(plan);
      gathering.setDate(gatheringDto.getDate());
      gathering.setStartTime(gatheringDto.getStartTime());
      gatherings.add(gathering);
    });
    plan.setGatherings(gatherings);
    return plan;
  }

}
