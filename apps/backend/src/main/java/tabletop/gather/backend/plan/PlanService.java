package tabletop.gather.backend.plan;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.game.Game;
import tabletop.gather.backend.game.GameDto;
import tabletop.gather.backend.game.GameRepository;
import tabletop.gather.backend.gathering.CreateGatheringDto;
import tabletop.gather.backend.gathering.Gathering;
import tabletop.gather.backend.gathering.GatheringDto;
import tabletop.gather.backend.gathering.GatheringRepository;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserDto;
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
    final List<Plan> plans = planRepository.findAllByIsPrivateFalseOrderByNameDesc();
    return plans.stream()
      .map(plan -> mapToDto(plan, new PlanDto()))
      .toList();
  }

  public DetailPlanDto getDetail(final UUID id) {
    return planRepository.findById(id)
      .map(plan -> mapToDto(plan, new DetailPlanDto()))
      .orElseThrow(NotFoundException::new);
  }

  public PlanDto get(final UUID id) {
    return planRepository.findById(id)
      .map(plan -> mapToDto(plan, new PlanDto()))
      .orElseThrow(NotFoundException::new);
  }

  public UUID create(final CreatePlanDto planDto, final UUID userId) {
    final Plan plan = new Plan();
    mapToEntity(planDto, plan);
    plan.setUser(userRepository.findById(userId)
      .orElseThrow(() -> new NotFoundException("user not found")));
    return planRepository.save(plan).getId();
  }

  public void update(final UUID id, final PlanDto planDto) {
    final Plan plan = planRepository.findById(id)
      .orElseThrow(NotFoundException::new);
    mapToEntity(planDto, plan);
    planRepository.save(plan);
  }

  public void delete(final UUID id) {
    planRepository.deleteById(id);
  }

  private PlanDto mapToDto(final Plan plan, final PlanDto planDto) {
    planDto.setId(plan.getId());
    planDto.setName(plan.getName());
    planDto.setIsPrivate(plan.getIsPrivate());
    planDto.setDescription(plan.getDescription());
    planDto.setPlayerLimit(plan.getPlayerLimit());
    planDto.setUser(plan.getUser() == null ? null : plan.getUser().getId());
    planDto.setGame(plan.getGame() == null ? null : plan.getGame().getId());
    return planDto;
  }

  private DetailPlanDto mapToDto(final Plan plan, final DetailPlanDto planDto) {
    planDto.setId(plan.getId());
    planDto.setName(plan.getName());
    planDto.setIsPrivate(plan.getIsPrivate());
    planDto.setDescription(plan.getDescription());
    planDto.setPlayerLimit(plan.getPlayerLimit());

    User owner = plan.getUser();
    UserDto ownerDto = new UserDto();
    ownerDto.setId(owner.getId());
    ownerDto.setUsername(owner.getUsername());
    ownerDto.setFirstName(owner.getFirstName());
    ownerDto.setLastName(owner.getLastName());
    planDto.setOwner(ownerDto);

    Game game = plan.getGame();
    if (game != null) {
      GameDto gameDto = new GameDto();
      gameDto.setId(game.getId());
      gameDto.setName(game.getName());
      gameDto.setDescription(game.getDescription());
      gameDto.setImageUrl(game.getImageUrl());
      planDto.setGame(gameDto);
    }

    Set<Gathering> gatherings = plan.getGatherings();
    List<GatheringDto> gatheringDtos = new ArrayList<>();
    gatherings.forEach(gathering -> {
      GatheringDto gatheringDto = new GatheringDto();
      gatheringDto.setId(gathering.getId());
      gatheringDto.setDate(gathering.getDate());
      gatheringDto.setStartTime(gathering.getStartTime());
      Set<User> users = gathering.getUsers();
      List<UUID> userIds = new ArrayList<>();
      users.forEach(user -> userIds.add(user.getId()));
      gatheringDtos.add(gatheringDto);
    });
    planDto.setGatherings(gatheringDtos);

    return planDto;
  }

  private Plan mapToEntity(final PlanDto planDto, final Plan plan) {
    plan.setName(planDto.getName());
    plan.setIsPrivate(planDto.getIsPrivate());
    plan.setDescription(planDto.getDescription());
    plan.setPlayerLimit(planDto.getPlayerLimit());
    final User user = planDto.getUser() == null ? null
      : userRepository.findById(planDto.getUser())
      .orElseThrow(() -> new NotFoundException("user not found"));
    plan.setUser(user);
    final Game game = planDto.getGame() == null ? null
      : gameRepository.findById(planDto.getGame())
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
