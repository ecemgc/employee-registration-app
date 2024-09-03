package io.github.ecemgc.employeeservice.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUpdateDepartment {
    private String name;
    private String description;
}
