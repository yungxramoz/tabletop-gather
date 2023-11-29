package tabletop.gather.backend.gathering;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tabletop.gather.backend.jwt.JwtService;

@RestController
@RequestMapping(value = "/api/gatherings", produces = MediaType.APPLICATION_JSON_VALUE)
public class GatheringResource {

  private final GatheringService gatheringService;

  private final JwtService jwtService;

  public GatheringResource(final GatheringService gatheringService, final JwtService jwtService) {
    this.gatheringService = gatheringService;
    this.jwtService = jwtService;
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
  public ResponseEntity<UUID> createGathering(@RequestBody @Valid final GatheringDto gatheringDto) {
    final UUID createdId = gatheringService.create(gatheringDto);
    return new ResponseEntity<>(createdId, HttpStatus.CREATED);
  }

  @PostMapping("/attend")
  @ApiResponse(responseCode = "201")
  public ResponseEntity<UUID> attendGathering(
      @RequestHeader("Authorization") final String token,
      @RequestBody @Valid final List<UpsertGatheringDto> upsertGatheringDtos) {
    final UUID userId = jwtService.getUserByToken(token).getId();
    gatheringService.removeAndAdd(upsertGatheringDtos, userId);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<UUID> updateGathering(
      @PathVariable(name = "id") final UUID id,
      @RequestBody @Valid final GatheringDto gatheringDto) {
    gatheringService.update(id, gatheringDto);
    return ResponseEntity.ok(id);
  }

  @DeleteMapping("/{id}")
  @ApiResponse(responseCode = "204")
  public ResponseEntity<Void> deleteGathering(@PathVariable(name = "id") final UUID id) {
    gatheringService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
