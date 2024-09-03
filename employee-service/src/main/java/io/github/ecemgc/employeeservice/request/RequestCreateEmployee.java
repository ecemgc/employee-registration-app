package io.github.ecemgc.employeeservice.request;

import io.github.ecemgc.employeeservice.entity.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class RequestCreateEmployee {
    private String firstName;
    private String lastName;
    @NotBlank(message = "Email is mandatory")
    private String email;
    private String password;
    private String phone;
    private String address;
    private String imageUrl;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Boolean isActive;
    private Long departmentId;
    private List<Role> roles;
}
