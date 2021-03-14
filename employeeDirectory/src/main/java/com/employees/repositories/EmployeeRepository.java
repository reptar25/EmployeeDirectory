package com.employees.repositories;

import com.employees.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN') or #employee.manager == null or #employee.manager.name == authentication.name")
    Employee save(@Param("employee") Employee employee);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN') or @employeeRepository.findById(#id).manager.name == authentication.name")
    void deleteById(@Param("id") Long id);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN') or #employee.manager.name == authentication.name")
    void delete(@Param("employee") Employee employee);

}
