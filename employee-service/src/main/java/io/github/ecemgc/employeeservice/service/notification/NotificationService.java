package io.github.ecemgc.employeeservice.service.notification;

import io.github.ecemgc.employeeservice.dto.SendMailDTO;

public interface NotificationService {
    void sendEmail(SendMailDTO sendMailDTO);
}
