package tabletop.gather.backend.unit.game;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;
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
    Game game = new Game();
    when(gameRepository.findByNameContaining(name, Sort.by("name")))
        .thenReturn(Arrays.asList(game));

    List<GameDto> response = gameService.findByUserId(name);

    assertEquals(1, response.size());
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
