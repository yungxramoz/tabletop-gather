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
import tabletop.gather.backend.model.AnonymousUserDTO;
import tabletop.gather.backend.service.AnonymousUserService;


@RestController
@RequestMapping(value = "/api/anonymousUsers", produces = MediaType.APPLICATION_JSON_VALUE)
public class AnonymousUserResource {

    private final AnonymousUserService anonymousUserService;

    public AnonymousUserResource(final AnonymousUserService anonymousUserService) {
        this.anonymousUserService = anonymousUserService;
    }

    @GetMapping
    public ResponseEntity<List<AnonymousUserDTO>> getAllAnonymousUsers() {
        return ResponseEntity.ok(anonymousUserService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnonymousUserDTO> getAnonymousUser(
            @PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(anonymousUserService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createAnonymousUser(
            @RequestBody @Valid final AnonymousUserDTO anonymousUserDTO) {
        final Long createdId = anonymousUserService.create(anonymousUserDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateAnonymousUser(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final AnonymousUserDTO anonymousUserDTO) {
        anonymousUserService.update(id, anonymousUserDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteAnonymousUser(@PathVariable(name = "id") final Long id) {
        anonymousUserService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
