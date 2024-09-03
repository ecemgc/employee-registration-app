package io.github.ecemgc.notificationservice.service.intf;

import io.github.ecemgc.notificationservice.dto.SendMailDTO;

public interface NotificationService {

    void sendNotification(SendMailDTO sendMailDTO);
}
