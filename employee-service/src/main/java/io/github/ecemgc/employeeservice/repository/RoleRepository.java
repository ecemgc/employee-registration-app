package io.github.ecemgc.employeeservice.repository;

import io.github.ecemgc.employeeservice.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    public Optional<Role> findByName(String name);
}
