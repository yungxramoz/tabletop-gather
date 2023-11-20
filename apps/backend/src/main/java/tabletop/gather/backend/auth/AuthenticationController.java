package tabletop.gather.backend.auth;

import tabletop.gather.backend.auth.LoginUserDto;
import tabletop.gather.backend.auth.LoginResponse;
import tabletop.gather.backend.auth.RegisterUserDto;
import tabletop.gather.backend.auth.AuthenticationService;
import tabletop.gather.backend.auth.JwtService;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserDto;
import tabletop.gather.backend.user.UserService;
import tabletop.gather.backend.user.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;


@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
public class AuthenticationController {

    public static final int AUTH_HEADER_BEARER_PREFIX_LENGTH = 7; // "Bearer, ".length() == 7

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> register(@RequestBody RegisterUserDto registerUserDto) {
        UserDto registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getAuthenticatedUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String token = authHeader.substring(AUTH_HEADER_BEARER_PREFIX_LENGTH);
        String email = jwtService.extractUsername(token);

        UserDto user = authenticationService.getUserByEmail(email);

        return ResponseEntity.ok(user);
    }
}
