package tabletop.gather.backend.unit.plan;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tabletop.gather.backend.jwt.JwtService;
import tabletop.gather.backend.plan.*;
import tabletop.gather.backend.user.*;

public class PlanResourceTest {

  @InjectMocks private PlanResource planResource;

  @Mock private PlanService planService;

  @Mock private JwtService jwtService;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testGetAllPlans() {
    String token = "Bearer testToken";
    UUID userId = UUID.randomUUID();
    UserDto userDto = new UserDto();
    userDto.setId(userId);
    OverviewPlanDto planDto = new OverviewPlanDto();
    when(jwtService.getUserByToken(token)).thenReturn(userDto);
    when(planService.findAllExceptUser(userId)).thenReturn(Arrays.asList(planDto));

    ResponseEntity<List<OverviewPlanDto>> response = planResource.getAllPlans(token);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(Arrays.asList(planDto), response.getBody());
  }

  @Test
  public void testGetAllPlansForUser() {
    String token = "Bearer testToken";
    UUID userId = UUID.randomUUID();
    UserDto userDto = new UserDto();
    userDto.setId(userId);
    when(jwtService.getUserByToken(token)).thenReturn(userDto);

    OverviewPlanDto planDto = new OverviewPlanDto();
    when(planService.findAllExceptUser(userId)).thenReturn(Arrays.asList(planDto));

    ResponseEntity<List<OverviewPlanDto>> response = planResource.getAllPlans(token);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(Arrays.asList(planDto), response.getBody());
  }

  @Test
  public void testGetPlan() {
    UUID planId = UUID.randomUUID();
    DetailPlanDto planDto = new DetailPlanDto();
    when(planService.getDetail(planId)).thenReturn(planDto);

    ResponseEntity<DetailPlanDto> response = planResource.getPlan(planId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(planDto, response.getBody());
  }

  @Test
  public void testCreatePlan() {
    UUID userId = UUID.randomUUID();
    UserDto userDto = new UserDto();
    userDto.setId(userId);
    when(jwtService.getUserByToken(anyString())).thenReturn(userDto);

    CreatePlanDto createPlanDto = new CreatePlanDto();
    UUID createdId = UUID.randomUUID();
    when(planService.create(createPlanDto, userId)).thenReturn(createdId);

    ResponseEntity<UUID> response = planResource.createPlan("Bearer testToken", createPlanDto);

    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    assertEquals(createdId, response.getBody());
  }

  @Test
  public void testUpdatePlan() {
    UUID userId = UUID.randomUUID();
    UserDto userDto = new UserDto();
    userDto.setId(userId);
    when(jwtService.getUserByToken(anyString())).thenReturn(userDto);

    UUID planId = UUID.randomUUID();
    PlanDto planDto = new PlanDto();
    planDto.setUser(userId);
    when(planService.get(planId)).thenReturn(planDto);

    UpdatePlanDto updatePlanDto = new UpdatePlanDto();
    ResponseEntity<UUID> response =
        planResource.updatePlan("Bearer testToken", planId, updatePlanDto);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(planId, response.getBody());
  }

  @Test
  public void testDeletePlan() {
    UUID userId = UUID.randomUUID();
    UserDto userDto = new UserDto();
    userDto.setId(userId);
    when(jwtService.getUserByToken(anyString())).thenReturn(userDto);

    UUID planId = UUID.randomUUID();
    PlanDto planDto = new PlanDto();
    planDto.setUser(userId);
    when(planService.get(planId)).thenReturn(planDto);

    ResponseEntity<Void> response = planResource.deletePlan("Bearer testToken", planId);

    assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
  }
}
