package tabletop.gather.backend.game;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
public class GameDTO {

    private UUID id;

    @NotNull
    @Size(max = 255)
    private String name;

    @Size(max = 4000)
    private String description;

    @NotNull
    private Integer minPlayer;

    private Integer maxPlayer;

    @Size(max = 500)
    private String imageUrl;

}
