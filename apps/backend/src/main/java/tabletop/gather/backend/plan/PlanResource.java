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

  /**
   * Get all public plans
   * @return all plans
   */
  @GetMapping
  public ResponseEntity<List<PlanDto>> getAllPlans() {
    return ResponseEntity.ok(planService.findAll());
  }

  /**
   * Get a plan by id
   * @param id the id of the plan
   * @return the plan
   */
  @GetMapping("/{id}")
  public ResponseEntity<PlanDto> getPlan(@PathVariable(name = "id") final UUID id) {
    return ResponseEntity.ok(planService.get(id));
  }

  /**
   * Create a plan
   * @param token the jwt token
   * @param planDTO the plan to create
   * @return the id of the created plan
   */
  @PostMapping
  @ApiResponse(responseCode = "201")
  public ResponseEntity<UUID> createPlan(@RequestHeader("Authorization") final String token,
                                         @RequestBody @Valid final CreatePlanDto planDTO) {
    UUID userId = jwtService.getUserByToken(token).getId();
    final UUID createdId = planService.create(planDTO, userId);
    return new ResponseEntity<>(createdId, HttpStatus.CREATED);
  }

  /**
   * Update a plan
   * @param id the id of the plan
   * @param planDTO the plan to update
   * @return the id of the updated plan
   */
  @PutMapping("/{id}")
  public ResponseEntity<UUID> updatePlan(@RequestHeader("Authorization") final String token,
                                         @PathVariable(name = "id") final UUID id,
                                         @RequestBody @Valid final PlanDto planDTO) {
    UUID userId = jwtService.getUserByToken(token).getId();
    PlanDto plan = planService.get(id);
    if (!plan.getUser().equals(userId)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    planService.update(id, planDTO);
    return ResponseEntity.ok(id);
  }

  /**
   * Delete a plan
   * @param token the jwt token
   * @param id the id of the plan
   * @return 204 no content
   */
  @DeleteMapping("/{id}")
  @ApiResponse(responseCode = "204")
  public ResponseEntity<Void> deletePlan(@RequestHeader("Authorization") final String token,
                                         @PathVariable(name = "id") final UUID id) {
    UUID userId = jwtService.getUserByToken(token).getId();
    PlanDto plan = planService.get(id);
    if (!plan.getUser().equals(userId)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    planService.delete(id);
    return ResponseEntity.noContent().build();
  }

}
