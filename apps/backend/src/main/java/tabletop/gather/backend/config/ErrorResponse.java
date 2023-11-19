package tabletop.gather.backend.config;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class ErrorResponse {

    private Integer httpStatus;
    private String exception;
    private String message;
    private List<FieldError> fieldErrors;

}
