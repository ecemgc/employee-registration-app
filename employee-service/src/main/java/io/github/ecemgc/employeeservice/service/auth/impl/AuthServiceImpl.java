package io.github.ecemgc.employeeservice.service.auth.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.github.ecemgc.employeeservice.entity.Employee;
import io.github.ecemgc.employeeservice.mapper.EmployeeMapper;
import io.github.ecemgc.employeeservice.request.RequestLogin;
import io.github.ecemgc.employeeservice.response.ResponseAuth;
import io.github.ecemgc.employeeservice.security.JwtUtils;
import io.github.ecemgc.employeeservice.service.auth.intf.AuthService;
import io.github.ecemgc.employeeservice.service.employee.intf.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final EmployeeMapper employeeMapper;
    @Override
    public ResponseAuth login(RequestLogin requestLogin)  {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(requestLogin.getEmail(), requestLogin.getPassword()));
       Employee employee = (Employee) authentication.getPrincipal();
        return new ResponseAuth()
            .setToken(jwtUtils.generateToken(employee.getEmail(), employee.getAuthorities()))
            .setEmployee(employeeMapper.toResponseEmployee(employee));
    }
}
