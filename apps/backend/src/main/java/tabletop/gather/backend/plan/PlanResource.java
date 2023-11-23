package tabletop.gather.backend.plan;

import io.swagger.v3.oas.annotations.headers.Header;
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
  public ResponseEntity<List<OverviewPlanDto>> getAllPlans() {
    return ResponseEntity.ok(planService.findAll());
  }

  /**
   * Get al my plans
   * @return all plans
   */
  @GetMapping("/me")
  public ResponseEntity<List<OverviewPlanDto>> getAllPlans(@RequestHeader("Authorization") final String token) {
    UUID userId = jwtService.getUserByToken(token).getId();
    return ResponseEntity.ok(planService.findAll(userId));
  }

  /**
   * Get a plan by id
   * @param id the id of the plan
   * @return the plan
   */
  @GetMapping("/{id}")
  public ResponseEntity<DetailPlanDto> getPlan(@PathVariable(name = "id") final UUID id) {
    return ResponseEntity.ok(planService.getDetail(id));
  }

  /**
   * Create a plan
   * @param token the jwt token
   * @param planDto the plan to create
   * @return the id of the created plan
   */
  @PostMapping
  @ApiResponse(responseCode = "201")
  public ResponseEntity<UUID> createPlan(@RequestHeader("Authorization") final String token,
                                         @RequestBody @Valid final CreatePlanDto planDto) {
    UUID userId = jwtService.getUserByToken(token).getId();
    final UUID createdId = planService.create(planDto, userId);
    return new ResponseEntity<>(createdId, HttpStatus.CREATED);
  }

  /**
   * Update a plan
   * @param id the id of the plan
   * @param planDto the plan to update
   * @return the id of the updated plan
   */
  @PutMapping("/{id}")
  public ResponseEntity<UUID> updatePlan(@RequestHeader("Authorization") final String token,
                                         @PathVariable(name = "id") final UUID id,
                                         @RequestBody @Valid final UpdatePlanDto planDto) {
    UUID userId = jwtService.getUserByToken(token).getId();
    PlanDto plan = planService.get(id);
    if (!plan.getUser().equals(userId)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    planService.update(id, planDto);
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
