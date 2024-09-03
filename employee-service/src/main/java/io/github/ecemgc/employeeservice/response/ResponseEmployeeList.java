package io.github.ecemgc.employeeservice.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseEmployeeList {
    private List<ResponseEmployee> responseEmployeeList;
}
