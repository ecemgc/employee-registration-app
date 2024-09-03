package io.github.ecemgc.employeeservice.controller;

import io.github.ecemgc.employeeservice.request.RequestCreateRole;
import io.github.ecemgc.employeeservice.request.RequestPage;
import io.github.ecemgc.employeeservice.response.ResponsePage;
import io.github.ecemgc.employeeservice.response.ResponseRole;
import io.github.ecemgc.employeeservice.service.role.intf.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@Tag(name = "Role Controller", description = "Operations related to role management")
public class RoleController {
    private final RoleService roleService;



    @GetMapping("/{name}")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ADMIN", "READ_ROLE"})
    @Operation(summary = "Get role by name")
    public ResponseRole findByName(@PathVariable String name){
        return roleService.findByName(name);
    }

    @GetMapping("/without-pagination")
    @Secured({"ADMIN", "READ_ROLE"})
    @Operation(summary = "Getting all roles without pagination")
    public List<ResponseRole> getAll(){
        return roleService.getAll();
    }

    @GetMapping
    @Secured({"ADMIN", "READ_ROLE"})
    @Operation(summary = "Getting all roles with pagination")
    public ResponsePage<ResponseRole> getAll(RequestPage requestPage){
        return roleService.getAll(requestPage.getPage(), requestPage.getPageSize(), requestPage.getSortBy(), requestPage.getDirection());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ADMIN", "WRITE_ROLE"})
    @Operation(summary = "Saves role")
    public void save(@RequestBody RequestCreateRole requestCreateRole){
        roleService.save(requestCreateRole);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured({"ADMIN", "WRITE_ROLE"})
    @Operation(summary = "Delete role by id")
    public void deleteById(@PathVariable Long id){
        roleService.deleteById(id);
    }



 }
