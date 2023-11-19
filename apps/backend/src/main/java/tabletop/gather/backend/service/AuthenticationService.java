package tabletop.gather.backend.service;

import tabletop.gather.backend.domain.User;
import tabletop.gather.backend.model.LoginUserDTO;
import tabletop.gather.backend.model.RegisterUserDTO;
import tabletop.gather.backend.model.UserDTO;
import tabletop.gather.backend.repos.UserRepository;
import tabletop.gather.backend.service.UserService;
import tabletop.gather.backend.util.NotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    
    private final UserService userService;
    
    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(
        UserRepository userRepository,
        UserService userService,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean isEmailTaken(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public UserDTO signup(RegisterUserDTO input) {
        User user = new User();
        user.setUsername(input.getUsername());
        user.setUsername(input.getUsername());
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setEmail(input.getEmail());
        user.setPasswordHash(passwordEncoder.encode(input.getPassword()));

        userRepository.save(user);
        return this.userService.mapToDTO(user, new UserDTO());
    }

    public User authenticate(LoginUserDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
            .orElseThrow(NotFoundException::new);
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(NotFoundException::new);

        return this.userService.mapToDTO(user, new UserDTO());
    }
}