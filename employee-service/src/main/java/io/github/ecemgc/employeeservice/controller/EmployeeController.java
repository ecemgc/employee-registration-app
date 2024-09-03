package io.github.ecemgc.employeeservice.controller;

import io.github.ecemgc.employeeservice.request.RequestCreateEmployee;
import io.github.ecemgc.employeeservice.request.RequestPage;
import io.github.ecemgc.employeeservice.request.RequestUpdateEmployee;
import io.github.ecemgc.employeeservice.response.ResponseEmployee;
import io.github.ecemgc.employeeservice.response.ResponsePage;
import io.github.ecemgc.employeeservice.service.employee.intf.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/employees")
@RestController
@RequiredArgsConstructor
@Tag(name = "Employee Controller", description = "Operations related to employee management")
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ADMIN", "WRITE_EMPLOYEE"})
    @Operation(summary = "Saves employee")
    public void save(@RequestBody @Valid RequestCreateEmployee requestCreateEmployee){
        employeeService.save(requestCreateEmployee);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ADMIN", "READ_EMPLOYEE"})
    @Operation(summary = "Getting all employees with pagination")
    public ResponsePage<ResponseEmployee> getAll(RequestPage requestPage){
        return employeeService.getAll(requestPage.getPage(), requestPage.getPageSize(), requestPage.getSortBy(), requestPage.getDirection());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured({"ADMIN", "WRITE_EMPLOYEE"})
    @Operation(summary = "Delete employee by id")
    public void delete(@PathVariable Long id) {
        employeeService.delete(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ADMIN", "READ_EMPLOYEE"})
    @Operation(summary = "Get employee by id")
    public ResponseEmployee getEmployeeById(@PathVariable Long id){
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ADMIN", "WRITE_EMPLOYEE"})
    @Operation(summary = "Update employee")
    public void update(@PathVariable Long id, @RequestBody RequestUpdateEmployee requestUpdateEmployee){
        employeeService.update(id, requestUpdateEmployee);
    }

}
