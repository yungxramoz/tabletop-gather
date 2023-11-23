package tabletop.gather.backend.plan;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tabletop.gather.backend.jwt.JwtService;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(value = "/api/plans", produces = MediaType.APPLICATION_JSON_VALUE)
public class PlanResource {

  private final PlanService planService;

  private final JwtService jwtService;

  public PlanResource(final PlanService planService, final JwtService jwtService) {
    this.planService = planService;
    this.jwtService = jwtService;
  }

  @GetMapping
  public ResponseEntity<List<PlanDto>> getAllPlans() {
    return ResponseEntity.ok(planService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<PlanDto> getPlan(@PathVariable(name = "id") final UUID id) {
    return ResponseEntity.ok(planService.get(id));
  }

  @PostMapping
  @ApiResponse(responseCode = "201")
  public ResponseEntity<UUID> createPlan(@RequestHeader("Authorization") final String token,
                                         @RequestBody @Valid final CreatePlanDto planDTO) {
    UUID userId = jwtService.getUserByToken(token).getId();
    final UUID createdId = planService.create(planDTO, userId);
    return new ResponseEntity<>(createdId, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<UUID> updatePlan(@PathVariable(name = "id") final UUID id,
                                         @RequestBody @Valid final PlanDto planDTO) {
    planService.update(id, planDTO);
    return ResponseEntity.ok(id);
  }

  @DeleteMapping("/{id}")
  @ApiResponse(responseCode = "204")
  public ResponseEntity<Void> deletePlan(@PathVariable(name = "id") final UUID id) {
    planService.delete(id);
    return ResponseEntity.noContent().build();
  }

}
