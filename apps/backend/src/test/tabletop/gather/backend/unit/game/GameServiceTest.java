package tabletop.gather.backend.unit.game;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;
import tabletop.gather.backend.game.*;
import tabletop.gather.backend.gathering.Gathering;
import tabletop.gather.backend.gathering.GatheringRepository;
import tabletop.gather.backend.plan.Plan;
import tabletop.gather.backend.plan.PlanRepository;
import tabletop.gather.backend.user.*;

public class GameServiceTest {

  @InjectMocks private GameService gameService;

  @Mock private GameRepository gameRepository;

  @Mock private UserRepository userRepository;

  @Mock private GatheringRepository gatheringRepository;

  @Mock private PlanRepository planRepository;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testFindByUserId() {
    String name = "game";
    Pageable pageable = PageRequest.of(0, 20, Sort.by("name"));

    List<Game> games = Arrays.asList(new Game());
    Page<Game> gamePage = new PageImpl<>(games, pageable, games.size());

    when(gameRepository.findByNameContainingIgnoreCase(name, pageable)).thenReturn(gamePage);

    Page<GameDto> response = gameService.findByName(name, pageable);

    assertEquals(1, response.getContent().size());
  }

  @Test
  public void testFindByUserIdUUID() {
    UUID userId = UUID.randomUUID();
    User user = new User();
    user.setId(userId);
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));

    Game game = new Game();
    when(gameRepository.findByUsers_Id(userId, Sort.by("name"))).thenReturn(Arrays.asList(game));

    List<GameDto> response = gameService.findByUserId(userId);

    assertEquals(1, response.size());
  }

  @Test
  public void testGet() {
    UUID gameId = UUID.randomUUID();
    Game game = new Game();
    game.setId(gameId);
    when(gameRepository.findById(gameId)).thenReturn(Optional.of(game));

    GameDto response = gameService.get(gameId);

    assertEquals(gameId, response.getId());
  }

  @Test
  public void testFindByAttendingOnPlan() {
    UUID planId = UUID.randomUUID();
    Gathering gathering = new Gathering();
    gathering.setDate(LocalDate.now());
    gathering.setStartTime(LocalTime.now());

    User user = new User();
    user.setId(UUID.randomUUID());
    user.setFirstName("Test");
    user.setLastName("User");
    List<User> users = new ArrayList<>();
    users.add(user);

    Game game1 = new Game();
    game1.setId(UUID.randomUUID());
    game1.setMinPlayer(1);
    game1.setMaxPlayer(5);
    game1.setUsers(new HashSet<>(users));

    Game game2 = new Game();
    game2.setId(UUID.randomUUID());
    game2.setMinPlayer(2);
    game2.setMaxPlayer(5);
    game2.setUsers(new HashSet<>(users));

    gathering.setUsers(new HashSet<>(users));

    when(planRepository.findById(planId)).thenReturn(Optional.of(new Plan()));
    when(gatheringRepository.findAllByPlanId(planId, Sort.by("date"))).thenReturn(Arrays.asList(gathering));
    when(gameRepository.findByUsersGatheringsPlanId(planId)).thenReturn(Arrays.asList(game1));

    List<GamePlanDto> response = gameService.findByAttendingOnPlan(planId);

    assertEquals(1, response.size());
    assertEquals(gathering.getDate(), response.get(0).getGatheringDate());
    assertEquals(gathering.getStartTime(), response.get(0).getGatheringStartTime());
    assertEquals(1, response.get(0).getGames().size()); // game2 is filtered out
    assertEquals(game1.getId(), response.get(0).getGames().get(0).getId());
    assertEquals(1, response.get(0).getGames().get(0).getOwners().size());
    assertEquals(user.getFirstName() + " " + user.getLastName(), response.get(0).getGames().get(0).getOwners().get(0));

    verify(planRepository, times(1)).findById(planId);
    verify(gatheringRepository, times(1)).findAllByPlanId(planId, Sort.by("date"));
    verify(gameRepository, times(1)).findByUsersGatheringsPlanId(planId);
  }

  @Test
  public void testAddUser() {
    UUID gameId = UUID.randomUUID();
    Game game = new Game();
    game.setUsers(new HashSet<>());
    when(gameRepository.findById(gameId)).thenReturn(Optional.of(game));

    UUID userId = UUID.randomUUID();
    User user = new User();
    user.setGames(new HashSet<>());
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));

    gameService.addUser(gameId, userId);

    verify(gameRepository, times(1)).save(game);
  }

  @Test
  public void testRemoveUser() {
    UUID gameId = UUID.randomUUID();
    Game game = new Game();
    game.setUsers(new HashSet<>());
    when(gameRepository.findById(gameId)).thenReturn(Optional.of(game));

    UUID userId = UUID.randomUUID();
    User user = new User();
    user.setGames(new HashSet<>());
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));

    gameService.removeUser(gameId, userId);

    verify(gameRepository, times(1)).save(game);
  }
}
