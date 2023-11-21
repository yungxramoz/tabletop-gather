package tabletop.gather.backend.auth;

import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import tabletop.gather.backend.jwt.JwtService;
import tabletop.gather.backend.user.User;
import tabletop.gather.backend.user.UserDto;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tabletop.gather.backend.jwt.JwtDto;

@SecurityRequirements()
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
public class AuthenticationResource {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationResource(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> register(@RequestBody RegisterUserDto registerUserDto) {
        UserDto registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        JwtDto loginResponse = new JwtDto();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
