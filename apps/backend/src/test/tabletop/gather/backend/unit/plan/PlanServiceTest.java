package tabletop.gather.backend.unit.plan;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
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
  public void testFindAllExceptUser() {
    User user1 = new User();
    user1.setId(UUID.randomUUID());
    Gathering gathering1 = new Gathering();
    gathering1.setDate(LocalDate.now().plusDays(1));
    gathering1.setUsers(new HashSet<>(Arrays.asList()));
    Plan plan1 = new Plan();
    plan1.setId(UUID.randomUUID());
    plan1.setUser(user1);
    plan1.setGatherings(new HashSet<>(Arrays.asList(gathering1)));
    plan1.setGame(new Game());
    plan1.setPlayerLimit(0);

    User user2 = new User();
    user2.setId(UUID.randomUUID());
    Gathering gathering2 = new Gathering();
    gathering2.setDate(LocalDate.now().plusDays(1));
    gathering2.setUsers(new HashSet<>(Arrays.asList()));
    Plan plan2 = new Plan();
    plan2.setId(UUID.randomUUID());
    plan2.setUser(user2);
    plan2.setGatherings(new HashSet<>(Arrays.asList(gathering2)));
    plan2.setGame(new Game());
    plan1.setPlayerLimit(0);

    Gathering gathering3 = new Gathering();
    gathering3.setDate(LocalDate.now().minusDays(1));
    gathering3.setUsers(new HashSet<>(Arrays.asList()));
    Plan plan3 = new Plan();
    plan3.setId(UUID.randomUUID());
    plan3.setUser(user2);
    plan3.setGatherings(new HashSet<>(Arrays.asList(gathering3)));
    plan3.setGame(new Game());
    plan1.setPlayerLimit(0);

    Gathering gathering4 = new Gathering();
    gathering4.setDate(LocalDate.now().plusDays(1));
    gathering4.setUsers(new HashSet<>(Arrays.asList(user2)));
    Plan plan4 = new Plan();
    plan4.setId(UUID.randomUUID());
    plan4.setUser(user2);
    plan4.setGatherings(new HashSet<>(Arrays.asList(gathering4)));
    plan4.setPlayerLimit(1);

    when(planRepository.findAllByIsPrivateFalse())
        .thenReturn(Arrays.asList(plan1, plan2, plan3, plan4));

    List<OverviewPlanDto> response = planService.findAllExceptUser(user1.getId());

    assertEquals(1, response.size());
    assertEquals(plan2.getId(), response.get(0).getId());
  }

  @Test
  public void testFindAllByUserId() {
    UUID userId = UUID.randomUUID();
    User user = new User();
    user.setId(userId);
    user.setFirstName("Mock");
    user.setLastName("Mockito");
    Gathering gathering1 = new Gathering();
    gathering1.setDate(LocalDate.now().plusDays(2));
    Gathering gathering2 = new Gathering();
    gathering2.setDate(LocalDate.now().minusDays(1));
    Plan plan = new Plan();
    plan.setUser(user);
    plan.setGatherings(new HashSet<>(Arrays.asList(gathering1)));
    plan.setGame(new Game());

    when(planRepository.findAllByUserId(userId)).thenReturn(Arrays.asList(plan));

    List<OverviewPlanDto> response = planService.findAll(userId);

    assertEquals(1, response.size());
    assertEquals(
        String.format("%s %s", user.getFirstName(), user.getLastName()),
        response.get(0).getOwnerName());
  }

  @Test
  public void testFindAllAttending() {
    User user1 = new User();
    user1.setId(UUID.randomUUID());
    Gathering gathering1 = new Gathering();
    gathering1.setDate(LocalDate.now().plusDays(1));
    gathering1.setUsers(new HashSet<>(Arrays.asList(user1)));
    Plan plan1 = new Plan();
    plan1.setId(UUID.randomUUID());
    plan1.setUser(user1);
    plan1.setGatherings(new HashSet<>(Arrays.asList(gathering1)));
    plan1.setGame(new Game());

    User user2 = new User();
    user2.setId(UUID.randomUUID());
    Gathering gathering2 = new Gathering();
    gathering2.setDate(LocalDate.now().plusDays(1));
    gathering2.setUsers(new HashSet<>(Arrays.asList(user2)));
    Plan plan2 = new Plan();
    plan2.setId(UUID.randomUUID());
    plan2.setUser(user2);
    plan2.setGatherings(new HashSet<>(Arrays.asList(gathering2)));
    plan2.setGame(new Game());

    when(planRepository.findAll()).thenReturn(Arrays.asList(plan1, plan2));

    List<OverviewPlanDto> response = planService.findAllAttending(user1.getId());

    assertEquals(1, response.size());
    assertEquals(plan1.getId(), response.get(0).getId());
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
