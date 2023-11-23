package tabletop.gather.backend.game;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserRepository;
import tabletop.gather.backend.util.NotFoundException;

import java.util.List;
import java.util.UUID;


@Service
@Transactional
public class GameService {

  private final GameRepository gameRepository;
  private final UserRepository userRepository;

  public GameService(final GameRepository gameRepository, final UserRepository userRepository) {
    this.gameRepository = gameRepository;
    this.userRepository = userRepository;
  }

  /**
   * Find all games containing the name.
   *
   * @param name part of the game name
   * @return all games containing the name
   */
  public List<GameDto> findByUserId(final String name) {
    final List<Game> games = gameRepository.findByNameContaining(name, Sort.by("name"));
    return games.stream()
      .map(game -> mapToDto(game, new GameDto()))
      .toList();
  }

  /**
   * Find all games by user.
   *
   * @param userId the id of the user
   * @return all games by user
   */
  public List<GameDto> findByUserId(final UUID userId) {
    userRepository.findById(userId)
      .orElseThrow(() -> new NotFoundException("User not found"));
    final List<Game> games = gameRepository.findByUsers_Id(userId, Sort.by("name"));
    return games.stream()
      .map(game -> mapToDto(game, new GameDto()))
      .toList();
  }

  /**
   * Get a game by id.
   *
   * @param id the id of the game
   * @return the game
   */
  public GameDto get(final UUID id) {
    return gameRepository.findById(id)
      .map(game -> mapToDto(game, new GameDto()))
      .orElseThrow(() -> new NotFoundException("Game not found"));
  }

  /**
   * Add a game to collection of a user.
   *
   * @param id the game to add
   * @param userId the user to add the game to
   * @return the id of the game
   */
  public void addUser(final UUID id, final UUID userId) {
    final Game game = gameRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("Game not found"));
    final User user = userRepository.findById(userId)
      .orElseThrow(() -> new NotFoundException("User not found"));
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
    final Game game = gameRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("Game not found"));
    final User user = userRepository.findById(userId)
      .orElseThrow(() -> new NotFoundException("User not found"));
    user.getGames().remove(game);
    game.getUsers().remove(user);
    gameRepository.delete(game);
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
}
