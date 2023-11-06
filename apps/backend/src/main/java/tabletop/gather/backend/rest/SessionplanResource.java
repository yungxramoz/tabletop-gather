package tabletop.gather.backend.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
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
import tabletop.gather.backend.model.SessionplanDTO;
import tabletop.gather.backend.service.SessionplanService;


@RestController
@RequestMapping(value = "/api/sessionplans", produces = MediaType.APPLICATION_JSON_VALUE)
public class SessionplanResource {

    private final SessionplanService sessionplanService;

    public SessionplanResource(final SessionplanService sessionplanService) {
        this.sessionplanService = sessionplanService;
    }

    @GetMapping
    public ResponseEntity<List<SessionplanDTO>> getAllSessionplans() {
        return ResponseEntity.ok(sessionplanService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessionplanDTO> getSessionplan(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(sessionplanService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createSessionplan(
            @RequestBody @Valid final SessionplanDTO sessionplanDTO) {
        final UUID createdId = sessionplanService.create(sessionplanDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateSessionplan(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final SessionplanDTO sessionplanDTO) {
        sessionplanService.update(id, sessionplanDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteSessionplan(@PathVariable(name = "id") final UUID id) {
        sessionplanService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
