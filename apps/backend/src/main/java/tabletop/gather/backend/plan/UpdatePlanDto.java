package tabletop.gather.backend.plan;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
public class UpdatePlanDto {

    private String name;

    private Boolean isPrivate;

    private String description;

    private int playerLimit;

    private UUID game;

}
