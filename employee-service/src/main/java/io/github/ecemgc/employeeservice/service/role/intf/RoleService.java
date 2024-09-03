package io.github.ecemgc.employeeservice.service.role.intf;

import io.github.ecemgc.employeeservice.entity.Role;
import io.github.ecemgc.employeeservice.request.RequestCreateRole;
import io.github.ecemgc.employeeservice.response.ResponsePage;
import io.github.ecemgc.employeeservice.response.ResponseRole;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface RoleService {
    ResponseRole findByName(String name);
    void save(RequestCreateRole requestCreateRole);
    void deleteById(Long id);
    ResponsePage<ResponseRole> getAll(int page, int size, String sortBy, Sort.Direction direction);
    List<ResponseRole> getAll();

}
