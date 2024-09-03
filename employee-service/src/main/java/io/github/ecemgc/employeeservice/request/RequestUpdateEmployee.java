package io.github.ecemgc.employeeservice.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.github.ecemgc.employeeservice.entity.Role;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class RequestUpdateEmployee {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String imageUrl;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;
    private Long departmentId;
    private List<Role> roles;
}
