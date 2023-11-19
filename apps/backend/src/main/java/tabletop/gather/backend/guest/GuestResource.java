package tabletop.gather.backend.guest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(value = "/api/guests", produces = MediaType.APPLICATION_JSON_VALUE)
public class GuestResource {

    private final GuestService guestService;

    public GuestResource(final GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping
    public ResponseEntity<List<GuestDTO>> getAllGuests() {
        return ResponseEntity.ok(guestService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuestDTO> getGuest(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(guestService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createGuest(@RequestBody @Valid final GuestDTO guestDTO) {
        final UUID createdId = guestService.create(guestDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateGuest(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final GuestDTO guestDTO) {
        guestService.update(id, guestDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteGuest(@PathVariable(name = "id") final UUID id) {
        guestService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
