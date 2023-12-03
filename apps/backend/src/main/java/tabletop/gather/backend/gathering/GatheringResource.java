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

  /**
   * Set the user's attendance for gatherings
   *
   * @param token the token of the authenticated user
   * @param upsertGatheringDtos the gatherings attendance status
   * @return 201 if successful
   */
  @PostMapping("/attend")
  @ApiResponse(responseCode = "201")
  public ResponseEntity<UUID> attendGathering(
      @RequestHeader("Authorization") final String token,
      @RequestBody @Valid final List<UpsertGatheringDto> upsertGatheringDtos) {
    final UUID userId = jwtService.getUserByToken(token).getId();
    gatheringService.removeAndAdd(upsertGatheringDtos, userId);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
}
