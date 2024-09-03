package io.github.ecemgc.employeeservice.service.department.impl;

import io.github.ecemgc.employeeservice.entity.Department;
import io.github.ecemgc.employeeservice.exceptions.NotFoundException;
import io.github.ecemgc.employeeservice.mapper.DepartmentMapper;
import io.github.ecemgc.employeeservice.repository.DepartmentRepository;
import io.github.ecemgc.employeeservice.request.RequestCreateDepartment;
import io.github.ecemgc.employeeservice.request.RequestUpdateDepartment;
import io.github.ecemgc.employeeservice.response.ResponseDepartment;
import io.github.ecemgc.employeeservice.response.ResponsePage;
import io.github.ecemgc.employeeservice.service.department.intf.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final DepartmentMapper departmentMapper;
    @Override
    public void save(RequestCreateDepartment requestCreateDepartment) {
        Department department = departmentMapper.toDepartment(requestCreateDepartment);
        departmentRepository.save(department);
    }

    @Override
    public void delete(Long id) {
        if(!departmentRepository.existsById(id)){
            throw new NotFoundException(String.format("Department with id %s not found", id));
        }
        departmentRepository.deleteById(id);
    }

    @Override
    public ResponseDepartment getById(Long id) {
        return departmentMapper.toResponse(
                departmentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Department with id %s not found", id))));
    }

    @Override
    public ResponsePage<ResponseDepartment> getAll(int page, int size, String sortBy, Sort.Direction direction) {
        Pageable pageable;
        if(sortBy != null){
            pageable = PageRequest.of(page, size,Sort.by(direction, sortBy));
        }else {
            pageable = PageRequest.of(page, size);
        }
        Page<Department> departmentPage = departmentRepository.findAll(pageable);
        return new ResponsePage<ResponseDepartment>()
                .setContent(departmentMapper.toResponse(departmentPage.getContent()))
                .setLast(departmentPage.isLast())
                .setPageNumber(departmentPage.getNumber())
                .setTotalPages(departmentPage.getTotalPages())
                .setTotalElements(departmentPage.getTotalElements())
                .setPageSize(departmentPage.getSize());
    }

    @Override
    public List<ResponseDepartment> getAll() {
        return  departmentMapper.toResponse(departmentRepository.findAll());
    }

    @Override
    public void update(Long id, RequestUpdateDepartment requestUpdateDepartment) {
        Department existingDepartment = departmentRepository.findById(id).orElseThrow(() -> new NotFoundException("Department with id %s not found".formatted(id)));
        existingDepartment.setName(requestUpdateDepartment.getName() != null ? requestUpdateDepartment.getName() : existingDepartment.getName());
        existingDepartment.setDescription(requestUpdateDepartment.getDescription() != null ? requestUpdateDepartment.getDescription() : existingDepartment.getDescription());
        departmentMapper.updateDepartment(requestUpdateDepartment, existingDepartment);
        departmentRepository.save(existingDepartment);

    }

}
