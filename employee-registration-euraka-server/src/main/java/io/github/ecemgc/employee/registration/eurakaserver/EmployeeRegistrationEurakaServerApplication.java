package io.github.ecemgc.employee.registration.eurakaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EmployeeRegistrationEurakaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeRegistrationEurakaServerApplication.class, args);
	}

}
