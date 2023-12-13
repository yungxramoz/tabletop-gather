package tabletop.gather.backend.unit.game;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tabletop.gather.backend.game.*;
import tabletop.gather.backend.jwt.*;
import tabletop.gather.backend.user.UserDto;

public class GameResourceTest {

  @InjectMocks private GameResource gameResource;

  @Mock private GameService gameService;

  @Mock private JwtService jwtService;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testGetAllGames() {
    String name = "game";
    Pageable pageable = PageRequest.of(0, 20, Sort.by("name"));

    List<GameDto> gameDtos = Arrays.asList(new GameDto());
    Page<GameDto> gameDtoPage = new PageImpl<>(gameDtos, pageable, gameDtos.size());

    when(gameService.findByName(name, pageable)).thenReturn(gameDtoPage);

    ResponseEntity<Page<GameDto>> response = gameResource.getAllGames(name, 0, 20);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(gameDtos, response.getBody().getContent());
  }

  @Test
  public void testGetGamesByUser() {
    UUID userId = UUID.randomUUID();
    GameDto gameDto = new GameDto();
    when(gameService.findByUserId(userId)).thenReturn(Arrays.asList(gameDto));

    ResponseEntity<List<GameDto>> response = gameResource.getGamesByUser(userId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(Arrays.asList(gameDto), response.getBody());
  }

  @Test
  public void testGetMyGames() {
    String token = "token";
    UUID userId = UUID.randomUUID();
    UserDto userDto = new UserDto();
    userDto.setId(userId);
    GameDto gameDto = new GameDto();

    when(jwtService.getUserByToken(token)).thenReturn(userDto);
    when(gameService.findByUserId(userId)).thenReturn(Arrays.asList(gameDto));

    ResponseEntity<List<GameDto>> response = gameResource.getGamesByUser(userId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(Arrays.asList(gameDto), response.getBody());
  }

  @Test
  public void testGetGame() {
    UUID gameId = UUID.randomUUID();
    GameDto gameDto = new GameDto();
    when(gameService.get(gameId)).thenReturn(gameDto);

    ResponseEntity<GameDto> response = gameResource.getGame(gameId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(gameDto, response.getBody());
  }

    @Test
    public void testGetGamesByPlanId() {
      UUID planId = UUID.randomUUID();
      GamePlanDto gamePlanDto = new GamePlanDto();
      when(gameService.findByAttendingOnPlan(planId)).thenReturn(Arrays.asList(gamePlanDto));

      List<GamePlanDto> gamePlanDtos = gameResource.getGamesByPlanId(planId);

      assertEquals(1, gamePlanDtos.size());
      verify(gameService, times(1)).findByAttendingOnPlan(planId);
    }

  @Test
  public void testAddGameToUser() {
    UUID gameId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    UserDto userDto = new UserDto();
    userDto.setId(userId);
    when(jwtService.getUserByToken(anyString())).thenReturn(userDto);

    ResponseEntity<Void> response = gameResource.addGameToUser("Bearer testToken", gameId);

    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    verify(gameService, times(1)).addUser(gameId, userId);
  }

  @Test
  public void testRemoveGameFromUser() {
    UUID gameId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    UserDto userDto = new UserDto();
    userDto.setId(userId);
    when(jwtService.getUserByToken(anyString())).thenReturn(userDto);

    ResponseEntity<Void> response = gameResource.removeGameFromUser("Bearer testToken", gameId);

    assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    verify(gameService, times(1)).removeUser(gameId, userId);
  }
}
