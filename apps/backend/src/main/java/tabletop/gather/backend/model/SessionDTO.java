package tabletop.gather.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SessionDTO {

    private UUID id;

    @NotNull
    private LocalDate date;

    @NotNull
    @Schema(type = "string", example = "18:30")
    private LocalTime startTime;

    @NotNull
    @Schema(type = "string", example = "18:30")
    private LocalTime endTime;

    @NotNull
    private UUID sessionplan;

}
