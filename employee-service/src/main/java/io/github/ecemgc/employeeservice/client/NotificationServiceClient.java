package io.github.ecemgc.employeeservice.client;

import io.github.ecemgc.employeeservice.dto.SendMailDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "${services.notification.name}", url = "${services.notification.url}")
public interface NotificationServiceClient {

    @PostMapping("/email")
    ResponseEntity<Void> sendEmail(SendMailDTO sendMailDTO);
}
