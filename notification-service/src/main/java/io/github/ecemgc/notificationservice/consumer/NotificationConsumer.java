package io.github.ecemgc.notificationservice.consumer;

import io.github.ecemgc.notificationservice.dto.SendMailDTO;
import io.github.ecemgc.notificationservice.service.impl.GmailNotificationServiceImpl;
import io.github.ecemgc.notificationservice.service.intf.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import static io.github.ecemgc.notificationservice.constant.RabbitMQConstants.NOTIFICATION_QUEUE;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationConsumer {

    private final NotificationService notificationService;


    @RabbitListener(queues = NOTIFICATION_QUEUE)
    public void receiveMessage(SendMailDTO dto) {
        log.info("Received message: {}", dto);
        notificationService.sendNotification(dto);
    }
}