package io.github.ecemgc.notificationservice.controller;

import io.github.ecemgc.notificationservice.dto.SendMailDTO;
import io.github.ecemgc.notificationservice.service.intf.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailNotificationController {

    private final NotificationService notificationService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void sendEmail(@RequestBody SendMailDTO sendMailDTO) {
        notificationService.sendNotification(sendMailDTO);
    }

}
