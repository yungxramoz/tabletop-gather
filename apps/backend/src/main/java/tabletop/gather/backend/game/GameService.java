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
                .map(game -> mapToDto(game, new GameDto()))
                .toList();
    }

    public GameDto get(final UUID id) {
        return gameRepository.findById(id)
                .map(game -> mapToDto(game, new GameDto()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final GameDto gameDto) {
        final Game game = new Game();
        mapToEntity(gameDto, game);
        return gameRepository.save(game).getId();
    }

    public void update(final UUID id, final GameDto gameDto) {
        final Game game = gameRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(gameDto, game);
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

    private GameDto mapToDto(final Game game, final GameDto gameDto) {
        gameDto.setId(game.getId());
        gameDto.setName(game.getName());
        gameDto.setDescription(game.getDescription());
        gameDto.setMinPlayer(game.getMinPlayer());
        gameDto.setMaxPlayer(game.getMaxPlayer());
        gameDto.setImageUrl(game.getImageUrl());
        return gameDto;
    }

    private Game mapToEntity(final GameDto gameDto, final Game game) {
        game.setName(gameDto.getName());
        game.setDescription(gameDto.getDescription());
        game.setMinPlayer(gameDto.getMinPlayer());
        game.setMaxPlayer(gameDto.getMaxPlayer());
        game.setImageUrl(gameDto.getImageUrl());
        return game;
    }

}
