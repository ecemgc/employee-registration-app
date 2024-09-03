package io.github.ecemgc.employeeservice.mapper;

import io.github.ecemgc.employeeservice.entity.Employee;
import io.github.ecemgc.employeeservice.request.RequestCreateEmployee;
import io.github.ecemgc.employeeservice.request.RequestUpdateEmployee;
import io.github.ecemgc.employeeservice.response.ResponseEmployee;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    Employee toEmployee(RequestCreateEmployee requestCreateEmployee);

    ResponseEmployee toResponseEmployee(Employee employee);
    List<ResponseEmployee> toResponseEmployee(List<Employee> employeeList);
    Employee toEmployee(RequestUpdateEmployee requestUpdateEmployee);
}
