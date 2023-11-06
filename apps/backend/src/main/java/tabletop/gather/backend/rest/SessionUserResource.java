package tabletop.gather.backend.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tabletop.gather.backend.model.SessionUserDTO;
import tabletop.gather.backend.service.SessionUserService;


@RestController
@RequestMapping(value = "/api/sessionUsers", produces = MediaType.APPLICATION_JSON_VALUE)
public class SessionUserResource {

    private final SessionUserService sessionUserService;

    public SessionUserResource(final SessionUserService sessionUserService) {
        this.sessionUserService = sessionUserService;
    }

    @GetMapping
    public ResponseEntity<List<SessionUserDTO>> getAllSessionUsers() {
        return ResponseEntity.ok(sessionUserService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessionUserDTO> getSessionUser(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(sessionUserService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createSessionUser(
            @RequestBody @Valid final SessionUserDTO sessionUserDTO) {
        final Long createdId = sessionUserService.create(sessionUserDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateSessionUser(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final SessionUserDTO sessionUserDTO) {
        sessionUserService.update(id, sessionUserDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteSessionUser(@PathVariable(name = "id") final Long id) {
        sessionUserService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
