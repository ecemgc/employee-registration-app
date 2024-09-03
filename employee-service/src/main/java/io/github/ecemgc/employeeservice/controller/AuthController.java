package io.github.ecemgc.employeeservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.github.ecemgc.employeeservice.request.RequestLogin;
import io.github.ecemgc.employeeservice.response.ResponseAuth;
import io.github.ecemgc.employeeservice.service.auth.intf.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseAuth login(@RequestBody RequestLogin requestLogin) throws JsonProcessingException {
        return authService.login(requestLogin);
    }
}
