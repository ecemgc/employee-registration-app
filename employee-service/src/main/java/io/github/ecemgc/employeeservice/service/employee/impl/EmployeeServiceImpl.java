package io.github.ecemgc.employeeservice.service.employee.impl;

import io.github.ecemgc.employeeservice.dto.SendMailDTO;
import io.github.ecemgc.employeeservice.entity.Department;
import io.github.ecemgc.employeeservice.entity.Employee;
import io.github.ecemgc.employeeservice.exceptions.NotFoundException;
import io.github.ecemgc.employeeservice.mapper.EmployeeMapper;
import io.github.ecemgc.employeeservice.repository.DepartmentRepository;
import io.github.ecemgc.employeeservice.repository.EmployeeRepository;
import io.github.ecemgc.employeeservice.request.RequestCreateEmployee;
import io.github.ecemgc.employeeservice.request.RequestUpdateEmployee;
import io.github.ecemgc.employeeservice.response.ResponseEmployee;
import io.github.ecemgc.employeeservice.response.ResponsePage;
import io.github.ecemgc.employeeservice.service.employee.intf.EmployeeService;
import io.github.ecemgc.employeeservice.service.notification.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeMapper employeeMapper;
    private final PasswordEncoder passwordEncoder;
    private final NotificationService notificationService;
    @Override
    public void save(RequestCreateEmployee requestCreateEmployee) {
        Long departmentId = requestCreateEmployee.getDepartmentId();
        if (departmentId == null) {
            throw new NotFoundException("Department is required.");
        }
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new NotFoundException("Department is not found"));
        String rawPassword = requestCreateEmployee.getPassword();
        Employee employee = employeeMapper.toEmployee(requestCreateEmployee);
        employee.setPassword(passwordEncoder.encode(rawPassword));
        employee.setDepartment(department);
        notificationService.sendEmail(new SendMailDTO()
                .setTo(employee.getEmail())
                .setSubject("Welcome to our team!")
                .setText("Welcome to our team %s %s.\nWe registered you in our system.\nYour password is: %s"
                        .formatted(employee.getFirstName(), employee.getLastName(), rawPassword))
                .setFrom("messagedeneme1@gmail.com"));
        employeeRepository.save(employee);
    }

    @Override
    public void delete(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new NotFoundException(String.format("Employee with id %s not found", id));
        }
        employeeRepository.deleteById(id);
    }

    @Override
    public ResponseEmployee getEmployeeById(Long id) {
        return employeeMapper.toResponseEmployee(
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(String.format("Employee with id %s not found", id))));
    }
    @Override
    public ResponsePage<ResponseEmployee> getAll(int page, int size, String sortBy, Sort.Direction direction) {
        Pageable pageable;
        if(sortBy != null){
            pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        } else {
            pageable = PageRequest.of(page,size);
        }
        Page<Employee> employeePage = employeeRepository.findAll(pageable);
        return new ResponsePage<ResponseEmployee>()
                .setContent(employeeMapper.toResponseEmployee(employeePage.getContent()))
                .setTotalElements(employeePage.getTotalElements())
                .setPageNumber(employeePage.getNumber())
                .setPageSize(employeePage.getSize())
                .setTotalPages(employeePage.getTotalPages())
                .setLast(employeePage.isLast());
    }

    @Override
    public void update(Long id, RequestUpdateEmployee requestUpdateEmployee) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee with id %s not found.".formatted(id)));
        Department department = departmentRepository.findById(requestUpdateEmployee.getDepartmentId()).orElseThrow(() -> new NotFoundException("Department not found."));
        Employee employee = employeeMapper.toEmployee(requestUpdateEmployee);
        employee.setId(id);
        employee.setDepartment(department);
        if(!requestUpdateEmployee.getPassword().equals(existingEmployee.getPassword())) {
           employee.setPassword(passwordEncoder.encode(requestUpdateEmployee.getPassword()));
        }
        notificationService.sendEmail(new SendMailDTO()
                .setTo(employee.getEmail())
                .setSubject("Information updated.")
                .setText("Your information updated %s %s. Please check from the system.".formatted(employee.getFirstName(), employee.getLastName()))
                .setFrom("messagedeneme1@gmail.com"));
        employeeRepository.save(employee);
    }

}
