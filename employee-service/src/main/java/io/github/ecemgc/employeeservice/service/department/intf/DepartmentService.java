package io.github.ecemgc.employeeservice.service.department.intf;

import io.github.ecemgc.employeeservice.request.RequestCreateDepartment;
import io.github.ecemgc.employeeservice.request.RequestUpdateDepartment;
import io.github.ecemgc.employeeservice.response.ResponseDepartment;
import io.github.ecemgc.employeeservice.response.ResponseEmployee;
import io.github.ecemgc.employeeservice.response.ResponsePage;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface DepartmentService {
    void save(RequestCreateDepartment requestCreateDepartment);
    void delete(Long id);
    ResponseDepartment getById(Long id);
    ResponsePage<ResponseDepartment> getAll(int page, int size, String sortBy, Sort.Direction direction);

    List<ResponseDepartment> getAll();
    void update(Long id, RequestUpdateDepartment requestUpdateDepartment);
}
