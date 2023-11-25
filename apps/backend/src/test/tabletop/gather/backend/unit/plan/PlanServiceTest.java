package tabletop.gather.backend.unit.plan;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tabletop.gather.backend.game.*;
import tabletop.gather.backend.gathering.CreateGatheringDto;
import tabletop.gather.backend.gathering.Gathering;
import tabletop.gather.backend.plan.*;
import tabletop.gather.backend.user.*;

public class PlanServiceTest {

  @InjectMocks private PlanService planService;

  @Mock private PlanRepository planRepository;

  @Mock private UserRepository userRepository;

  @Mock private GameRepository gameRepository;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testFindAll() {
    Plan plan = new Plan();
    User user = new User();
    user.setId(UUID.randomUUID());
    plan.setUser(user);
    plan.setGatherings(new HashSet<>(Arrays.asList(new Gathering())));
    plan.setGame(new Game());

    when(planRepository.findAllByIsPrivateFalse()).thenReturn(Arrays.asList(plan));

    List<OverviewPlanDto> response = planService.findAll();

    assertEquals(1, response.size());
  }

  @Test
  public void testFindAllByUserId() {
    UUID userId = UUID.randomUUID();
    Plan plan = new Plan();
    User user = new User();
    user.setId(userId);
    user.setFirstName("Mock");
    user.setLastName("Mockito");
    plan.setUser(user);
    plan.setGatherings(new HashSet<>(Arrays.asList(new Gathering())));
    plan.setGame(new Game());

    when(planRepository.findAllByUserId(userId)).thenReturn(Arrays.asList(plan));

    List<OverviewPlanDto> response = planService.findAll(userId);

    assertEquals(1, response.size());
    assertEquals(
        String.format("%s %s", user.getFirstName(), user.getLastName()),
        response.get(0).getOwnerName());
  }

  @Test
  public void testGetDetail() {
    UUID planId = UUID.randomUUID();
    Plan plan = new Plan();
    plan.setId(planId);
    User user = new User();
    user.setFirstName("Mock");
    user.setLastName("Mockito");
    plan.setUser(user);
    Gathering gathering = new Gathering();
    gathering.setUsers(new HashSet<>(Arrays.asList(new User())));
    plan.setGatherings(new HashSet<>(Arrays.asList(gathering)));
    plan.setGame(new Game());

    when(planRepository.findById(planId)).thenReturn(Optional.of(plan));

    DetailPlanDto response = planService.getDetail(planId);

    assertEquals(planId, response.getId());
  }

  @Test
  public void testGet() {
    UUID planId = UUID.randomUUID();
    Plan plan = new Plan();
    plan.setId(planId);

    when(planRepository.findById(planId)).thenReturn(Optional.of(plan));

    PlanDto response = planService.get(planId);

    assertEquals(planId, response.getId());
  }

  @Test
  public void testCreate() {
    UUID userId = UUID.randomUUID();
    User user = new User();
    user.setId(userId);
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));

    CreatePlanDto createPlanDto = new CreatePlanDto();
    createPlanDto.setGatherings(Arrays.asList(new CreateGatheringDto()));
    Plan plan = new Plan();
    plan.setId(UUID.randomUUID());

    when(planRepository.save(any(Plan.class))).thenReturn(plan);

    UUID response = planService.create(createPlanDto, userId);

    assertEquals(plan.getId(), response);
  }

  @Test
  public void testUpdate() {
    UUID planId = UUID.randomUUID();
    Plan plan = new Plan();

    when(planRepository.findById(planId)).thenReturn(Optional.of(plan));

    UpdatePlanDto updatePlanDto = new UpdatePlanDto();
    planService.update(planId, updatePlanDto);

    verify(planRepository, times(1)).save(plan);
  }

  @Test
  public void testDelete() {
    UUID planId = UUID.randomUUID();
    planService.delete(planId);

    verify(planRepository, times(1)).deleteById(planId);
  }
}
