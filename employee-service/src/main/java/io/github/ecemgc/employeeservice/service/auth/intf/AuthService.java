package io.github.ecemgc.employeeservice.service.auth.intf;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.github.ecemgc.employeeservice.request.RequestLogin;
import io.github.ecemgc.employeeservice.response.ResponseAuth;

public interface AuthService {
    ResponseAuth login(RequestLogin requestLogin) throws JsonProcessingException;
}