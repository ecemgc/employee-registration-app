package io.github.ecemgc.employeeservice.response;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class ResponseAuth {
    private String token;
    private ResponseEmployee employee;
}
