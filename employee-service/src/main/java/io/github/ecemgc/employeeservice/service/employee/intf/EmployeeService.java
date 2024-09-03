package io.github.ecemgc.employeeservice.service.employee.intf;

import io.github.ecemgc.employeeservice.entity.Employee;
import io.github.ecemgc.employeeservice.request.RequestCreateEmployee;
import io.github.ecemgc.employeeservice.request.RequestUpdateEmployee;
import io.github.ecemgc.employeeservice.response.ResponseEmployee;
import io.github.ecemgc.employeeservice.response.ResponsePage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface EmployeeService {

    void save(RequestCreateEmployee requestCreateEmployee);
    void delete(Long id);
    ResponseEmployee getEmployeeById(Long id);
    ResponsePage<ResponseEmployee> getAll(int page, int size, String sortBy, Sort.Direction direction);

    void update(Long id, RequestUpdateEmployee requestUpdateEmployee);

}
