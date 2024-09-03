package io.github.ecemgc.employeeservice.controller;

import io.github.ecemgc.employeeservice.request.RequestCreateDepartment;
import io.github.ecemgc.employeeservice.request.RequestPage;
import io.github.ecemgc.employeeservice.request.RequestUpdateDepartment;
import io.github.ecemgc.employeeservice.response.ResponseDepartment;
import io.github.ecemgc.employeeservice.response.ResponsePage;
import io.github.ecemgc.employeeservice.service.department.intf.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.PrePersist;
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

import java.util.List;

@RestController
@RequestMapping("/departments")
@RequiredArgsConstructor
@Tag(name = "Department Controller", description = "Operations related to department management")
public class DepartmentController {
    private final DepartmentService departmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ADMIN", "WRITE_DEPARTMENT"})
    @Operation(summary = "Saves department")
    public void save(@RequestBody @Valid RequestCreateDepartment requestCreateDepartment){
        departmentService.save(requestCreateDepartment);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured({"ADMIN", "WRITE_DEPARTMENT"})
    @Operation(summary = "Delete department by id")
    public void delete(@PathVariable Long id){
        departmentService.delete(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ADMIN", "READ_DEPARTMENT"})
    @Operation(summary = "Get department by id")
    public ResponseDepartment getById(@PathVariable Long id) {
        return departmentService.getById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ADMIN", "READ_DEPARTMENT"})
    @Operation(summary = "Getting all departments with pagination")
    public ResponsePage<ResponseDepartment> getAll(RequestPage requestPage){
        return departmentService.getAll(requestPage.getPage(), requestPage.getPageSize(), requestPage.getSortBy(), requestPage.getDirection());
    }


    @GetMapping("/without-pagination")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ADMIN", "READ_DEPARTMENT"})
    @Operation(summary = "Getting all departments without pagination")
    public List<ResponseDepartment> getAll(){
        return departmentService.getAll();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ADMIN", "WRITE_DEPARTMENT"})
    @Operation(summary = "Update department")
    public void update(@PathVariable Long id, @RequestBody RequestUpdateDepartment requestUpdateDepartment){
        departmentService.update(id, requestUpdateDepartment);
    }
}
