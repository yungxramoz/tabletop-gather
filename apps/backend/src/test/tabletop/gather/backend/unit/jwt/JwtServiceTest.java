package tabletop.gather.backend.unit.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;
import tabletop.gather.backend.jwt.JwtDto;
import tabletop.gather.backend.jwt.JwtService;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserDto;
import tabletop.gather.backend.user.UserService;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class JwtServiceTest {

  @InjectMocks
  private JwtService jwtService;

  @Mock
  private UserService userService;
  @Mock
  private UserDetails userDetails;

  @BeforeEach
  public void init() {
    jwtService = new JwtService(userService);
    ReflectionTestUtils.setField(jwtService, "secretKey", "909912191940e298a1157bfdebb1f5f785daf15b93a1787b80350deab6cdce55");
    ReflectionTestUtils.setField(jwtService, "jwtExpiration", 3600000L);
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testExtractUsername() {
    // this is bad practice but safe to generate a valid token with a secret key
    when(userDetails.getUsername()).thenReturn("test");
    String token = jwtService.generateToken(userDetails);

    token = "Bearer " + token;

    String username = jwtService.extractUsername(token);

    assertEquals("test", username);
  }

  @Test
  public void testGenerateToken() {
    when(userDetails.getUsername()).thenReturn("test");

    String token = jwtService.generateToken(userDetails);

    assertNotNull(token);
    verify(userDetails, times(1)).getUsername();
  }

  @Test
  public void testIsTokenValid() {
    // this is bad practice but safe to generate a valid token with a secret key
    when(userDetails.getUsername()).thenReturn("test");
    String token = jwtService.generateToken(userDetails);

    boolean isValid = jwtService.isTokenValid(token, userDetails);

    assertTrue(isValid);
    //one for isTokenValid and one for generateToken
    verify(userDetails, times(2)).getUsername();
  }

  @Test
  public void testGetNewJwtToken() {
    User user = new User();
    user.setUsername("test");
    user.setPasswordHash("test");

    JwtDto jwtDto = jwtService.getNewJwtToken(user);

    assertNotNull(jwtDto);
    assertNotNull(jwtDto.getToken());
    assertEquals(jwtService.getExpirationTime(), jwtDto.getExpiresIn());
  }
}
