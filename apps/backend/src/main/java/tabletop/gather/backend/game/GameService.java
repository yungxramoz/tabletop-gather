package tabletop.gather.backend.game;

import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.gathering.DateTimeGatheringDto;
import tabletop.gather.backend.gathering.Gathering;
import tabletop.gather.backend.gathering.GatheringRepository;
import tabletop.gather.backend.plan.Plan;
import tabletop.gather.backend.plan.PlanRepository;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserRepository;
import tabletop.gather.backend.util.NotFoundException;

@Service
@Transactional
public class GameService {

  private final GameRepository gameRepository;
  private final UserRepository userRepository;
  private final GatheringRepository gatheringRepository;
  private final PlanRepository planRepository;

  public GameService(
      final GameRepository gameRepository,
      final UserRepository userRepository,
      final GatheringRepository gatheringRepository,
      PlanRepository planRepository) {
    this.gameRepository = gameRepository;
    this.userRepository = userRepository;
    this.gatheringRepository = gatheringRepository;
    this.planRepository = planRepository;
  }

  /**
   * Find all games containing the name.
   *
   * @param name
   * @param pageable
   * @return all games with given params
   */
  public Page<GameDto> findByName(String name, Pageable pageable) {
    Page<Game> gamesPage = gameRepository.findByNameContainingIgnoreCase(name, pageable);
    List<GameDto> gameDtos =
        gamesPage.getContent().stream().map(game -> mapToDto(game, new GameDto())).toList();

    return new PageImpl<>(gameDtos, pageable, gamesPage.getTotalElements());
  }

  /**
   * Find all games by user.
   *
   * @param userId the id of the user
   * @return all games by user
   */
  public List<GameDto> findByUserId(final UUID userId) {
    userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
    final List<Game> games = gameRepository.findByUsers_Id(userId, Sort.by("name"));
    return games.stream().map(game -> mapToDto(game, new GameDto())).toList();
  }

  /**
   * Get a game by id.
   *
   * @param id the id of the game
   * @return the game
   */
  public GameDto get(final UUID id) {
    return gameRepository
        .findById(id)
        .map(game -> mapToDto(game, new GameDto()))
        .orElseThrow(() -> new NotFoundException("Game not found"));
  }

  /**
   * Get all games of attending users on a plan per gathering.
   *
   * @param id the id of the plan
   * @return all games attending on the plan
   */
  public List<GamePlanDto> findByAttendingOnPlan(final UUID id) {
    List<GamePlanDto> gamePlanDtos = new ArrayList<>();
    Plan plan =
        planRepository.findById(id).orElseThrow(() -> new NotFoundException("Plan not found"));
    final List<Gathering> gatherings = gatheringRepository.findAllByPlanId(id, Sort.by("date"));
    for (Gathering gathering : gatherings) {
      List<User> attendees = new ArrayList<>(gathering.getUsers());
      // Add the plan's owner to the attendees
      attendees.add(plan.getUser());
      List<Game> games = new ArrayList<>(gameRepository.findByUsersGatheringsPlanId(id));
      games.removeIf(
          game -> game.getMinPlayer() > attendees.size() || game.getMaxPlayer() < attendees.size());
      final List<GameOwnersDto> gameDtos =
          games.stream().map(game -> mapToDto(game, attendees, new GameOwnersDto())).toList();
      gamePlanDtos.add(mapToDto(gameDtos, gathering, new GamePlanDto()));
    }
    return gamePlanDtos;
  }

  /**
   * Add a game to collection of a user.
   *
   * @param id the game to add
   * @param userId the user to add the game to
   * @return the id of the game
   */
  public void addUser(final UUID id, final UUID userId) {
    final Game game =
        gameRepository.findById(id).orElseThrow(() -> new NotFoundException("Game not found"));
    final User user =
        userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
    user.getGames().add(game);
    game.getUsers().add(user);
    gameRepository.save(game);
  }

  /**
   * Remove a game from collection of a user.
   *
   * @param id the game to remove
   * @param userId the user to remove the game from
   */
  public void removeUser(final UUID id, final UUID userId) {
    final Game game =
        gameRepository.findById(id).orElseThrow(() -> new NotFoundException("Game not found"));
    final User user =
        userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
    user.getGames().remove(game);
    game.getUsers().remove(user);
    gameRepository.save(game);
  }

  private GameDto mapToDto(final Game game, final GameDto gameDto) {
    gameDto.setId(game.getId());
    gameDto.setName(game.getName());
    gameDto.setDescription(game.getDescription());
    gameDto.setMinPlayer(game.getMinPlayer());
    gameDto.setMaxPlayer(game.getMaxPlayer());
    gameDto.setImageUrl(game.getImageUrl());
    return gameDto;
  }

  private GameOwnersDto mapToDto(
      final Game game, List<User> attendees, GameOwnersDto gameOwnersDto) {
    gameOwnersDto = (GameOwnersDto) mapToDto(game, gameOwnersDto);
    List<User> owners = game.getUsers().stream().filter(attendees::contains).toList();
    gameOwnersDto.setOwners(
        owners.stream()
            .map(user -> String.format("%s %s", user.getFirstName(), user.getLastName()))
            .toList());
    return gameOwnersDto;
  }

  private GamePlanDto mapToDto(
      final List<GameOwnersDto> gameOwnerDtos,
      final Gathering gathering,
      final GamePlanDto gamePlanDto) {
    DateTimeGatheringDto gatheringDto = new DateTimeGatheringDto();
    gatheringDto.setDate(gathering.getDate());
    gatheringDto.setStartTime(gathering.getStartTime());
    gamePlanDto.setGatheringDto(gatheringDto);
    gamePlanDto.setGames(gameOwnerDtos);
    return gamePlanDto;
  }
}
