package tabletop.gather.backend.game;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(value = "/api/games", produces = MediaType.APPLICATION_JSON_VALUE)
public class GameResource {

    private final GameService gameService;

    public GameResource(final GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ResponseEntity<List<GameDto>> getAllGames() {
        return ResponseEntity.ok(gameService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDto> getGame(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(gameService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createGame(@RequestBody @Valid final GameDto gameDto) {
        final UUID createdId = gameService.create(gameDto);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateGame(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final GameDto gameDto) {
        gameService.update(id, gameDto);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteGame(@PathVariable(name = "id") final UUID id) {
        gameService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
