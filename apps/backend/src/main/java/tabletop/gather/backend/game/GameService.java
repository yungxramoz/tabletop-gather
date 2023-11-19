package tabletop.gather.backend.game;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
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

    public List<GameDto> findAll() {
        final List<Game> games = gameRepository.findAll(Sort.by("id"));
        return games.stream()
                .map(game -> mapToDTO(game, new GameDto()))
                .toList();
    }

    public GameDto get(final UUID id) {
        return gameRepository.findById(id)
                .map(game -> mapToDTO(game, new GameDto()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final GameDto gameDTO) {
        final Game game = new Game();
        mapToEntity(gameDTO, game);
        return gameRepository.save(game).getId();
    }

    public void update(final UUID id, final GameDto gameDTO) {
        final Game game = gameRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(gameDTO, game);
        gameRepository.save(game);
    }

    public void delete(final UUID id) {
        final Game game = gameRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        // remove many-to-many relations at owning side
        userRepository.findAllByGames(game)
                .forEach(user -> user.getGames().remove(game));
        gameRepository.delete(game);
    }

    private GameDto mapToDTO(final Game game, final GameDto gameDTO) {
        gameDTO.setId(game.getId());
        gameDTO.setName(game.getName());
        gameDTO.setDescription(game.getDescription());
        gameDTO.setMinPlayer(game.getMinPlayer());
        gameDTO.setMaxPlayer(game.getMaxPlayer());
        gameDTO.setImageUrl(game.getImageUrl());
        return gameDTO;
    }

    private Game mapToEntity(final GameDto gameDTO, final Game game) {
        game.setName(gameDTO.getName());
        game.setDescription(gameDTO.getDescription());
        game.setMinPlayer(gameDTO.getMinPlayer());
        game.setMaxPlayer(gameDTO.getMaxPlayer());
        game.setImageUrl(gameDTO.getImageUrl());
        return game;
    }

}
