package tabletop.gather.backend.gathering;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(value = "/api/gatherings", produces = MediaType.APPLICATION_JSON_VALUE)
public class GatheringResource {

    private final GatheringService gatheringService;

    public GatheringResource(final GatheringService gatheringService) {
        this.gatheringService = gatheringService;
    }

    @GetMapping
    public ResponseEntity<List<GatheringDto>> getAllGatherings() {
        return ResponseEntity.ok(gatheringService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GatheringDto> getGathering(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(gatheringService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createGathering(
            @RequestBody @Valid final GatheringDto gatheringDTO) {
        final UUID createdId = gatheringService.create(gatheringDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateGathering(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final GatheringDto gatheringDTO) {
        gatheringService.update(id, gatheringDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteGathering(@PathVariable(name = "id") final UUID id) {
        gatheringService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
