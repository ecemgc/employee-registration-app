package io.github.ecemgc.employeeservice.request;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class RequestLogin {
    private String email;
    private String password;
}
