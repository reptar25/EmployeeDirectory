package com.employees;

import com.employees.repositories.EmployeeRepository;
import com.employees.repositories.ManagerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Random;

@Component
public class DatabaseLoader implements CommandLineRunner {

    public final EmployeeRepository employees;
    public final ManagerRepository managers;

    @Autowired
    public DatabaseLoader(EmployeeRepository employees, ManagerRepository managers){
        this.employees = employees;
        this.managers = managers;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            Random rand = new Random();

            Manager david = managers.save(new Manager("DOrtiz", "password",
                    "ROLE_MANAGER"));

            Manager kevin = managers.save(new Manager("KBailey", "password",
                    "ROLE_MANAGER"));

            Manager admin = managers.save(new Manager("admin", "admin", "ROLE_ADMIN"));

            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken("admin", "doesn't matter",
                            AuthorityUtils.createAuthorityList("ROLE_ADMIN")));

            // create object mapper instance
            ObjectMapper mapper = new ObjectMapper();

            // convert JSON string to employee object
            Employee[] employees = mapper.readValue(new File("MOCK_DATA.json"), Employee[].class);

            for(Employee employee : employees){

                if(rand.nextBoolean())
                    employee.setManager(kevin);
                else
                    employee.setManager(david);

                this.employees.save(employee);
            }
            SecurityContextHolder.clearContext();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
