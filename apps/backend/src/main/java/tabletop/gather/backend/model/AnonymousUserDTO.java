package tabletop.gather.backend.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AnonymousUserDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String name;

}
