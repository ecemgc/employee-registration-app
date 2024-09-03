package io.github.ecemgc.employeeservice.mapper;


import io.github.ecemgc.employeeservice.entity.Department;
import io.github.ecemgc.employeeservice.request.RequestCreateDepartment;
import io.github.ecemgc.employeeservice.request.RequestUpdateDepartment;
import io.github.ecemgc.employeeservice.response.ResponseDepartment;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DepartmentMapper {

    Department toDepartment(RequestCreateDepartment requestCreateDepartment);
    ResponseDepartment toResponse(Department department);
    List<ResponseDepartment> toResponse(List<Department> departmentList);
    void updateDepartment(RequestUpdateDepartment requestUpdateDepartment, @MappingTarget Department department);
}
