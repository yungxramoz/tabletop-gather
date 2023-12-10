package tabletop.gather.backend.unit.game;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;
import tabletop.gather.backend.game.*;
import tabletop.gather.backend.user.*;

public class GameServiceTest {

  @InjectMocks private GameService gameService;

  @Mock private GameRepository gameRepository;

  @Mock private UserRepository userRepository;

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
    User user = new User();
    user.setId(UUID.randomUUID());
    List<User> users = new ArrayList<>();
    users.add(user);

    UUID planId = UUID.randomUUID();
    Game game1 = new Game();
    game1.setId(UUID.randomUUID());
    game1.setMinPlayer(1);
    game1.setMaxPlayer(5);
    game1.setUsers(new HashSet<>(users));

    Game game2 = new Game();
    game2.setId(UUID.randomUUID());
    game2.setMinPlayer(99);
    game2.setMaxPlayer(100);
    game2.setUsers(new HashSet<>(users));
    when(gameRepository.findByUsersGatheringsPlanId(planId))
        .thenReturn(Arrays.asList(game1, game2));

    when(userRepository.findByGatheringsPlanId(planId)).thenReturn(users);

    List<GamePlanDto> gamePlanDtos = gameService.findByAttendingOnPlan(planId);

    assertEquals(1, gamePlanDtos.size());
    assertEquals(game1.getId(), gamePlanDtos.get(0).getId());
    verify(gameRepository, times(1)).findByUsersGatheringsPlanId(planId);
    verify(userRepository, times(1)).findByGatheringsPlanId(planId);
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
