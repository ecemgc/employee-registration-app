package io.github.ecemgc.employeeservice.mapper;

import io.github.ecemgc.employeeservice.entity.Role;
import io.github.ecemgc.employeeservice.exceptions.NotFoundException;
import io.github.ecemgc.employeeservice.request.RequestCreateRole;
import io.github.ecemgc.employeeservice.response.ResponseRole;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RequestCreateRole requestCreateRole);
    ResponseRole toResponse(Role role);
    List<ResponseRole> toResponse(List<Role> roleList);

}
