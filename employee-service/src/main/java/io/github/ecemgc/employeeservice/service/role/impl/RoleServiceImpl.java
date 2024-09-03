package io.github.ecemgc.employeeservice.service.role.impl;

import io.github.ecemgc.employeeservice.entity.Role;
import io.github.ecemgc.employeeservice.exceptions.NotFoundException;
import io.github.ecemgc.employeeservice.mapper.RoleMapper;
import io.github.ecemgc.employeeservice.repository.RoleRepository;
import io.github.ecemgc.employeeservice.request.RequestCreateRole;
import io.github.ecemgc.employeeservice.response.ResponsePage;
import io.github.ecemgc.employeeservice.response.ResponseRole;
import io.github.ecemgc.employeeservice.service.role.intf.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;
    @Override
    public ResponseRole findByName(String name) {

        return roleMapper.toResponse(
                roleRepository.findByName(name)
                        .orElseThrow(() -> new NotFoundException("Role with name %s not found.".formatted(name)))
        );

    }

    @Override
    public void save(RequestCreateRole requestCreateRole) {
        roleRepository.save(roleMapper.toRole(requestCreateRole));
    }

    @Override
    public void deleteById(Long id) {
        if(!roleRepository.existsById(id)){
            throw new NotFoundException("Role with id %s not found".formatted(id));
        }
        roleRepository.deleteById(id);
    }

    @Override
    public ResponsePage<ResponseRole> getAll(int page, int size, String sortBy, Sort.Direction direction) {
        Pageable pageable;
        if (sortBy != null){
            pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        }else {
            pageable = PageRequest.of(page, size);
        }
        Page<Role> rolePage = roleRepository.findAll(pageable);
        return new ResponsePage<ResponseRole>()
                .setContent(roleMapper.toResponse(rolePage.getContent()))
                .setLast(rolePage.isLast())
                .setPageNumber(rolePage.getNumber())
                .setTotalPages(rolePage.getTotalPages())
                .setTotalElements(rolePage.getTotalElements())
                .setPageSize(rolePage.getSize());
    }

    @Override
    public List<ResponseRole> getAll() {
        return roleMapper.toResponse(roleRepository.findAll());
    }
}
