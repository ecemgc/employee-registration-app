package io.github.ecemgc.employeeservice.service.notification;

import io.github.ecemgc.employeeservice.client.NotificationServiceClient;
import io.github.ecemgc.employeeservice.config.rabbitmq.RabbitMQConfigurationProperties;
import io.github.ecemgc.employeeservice.dto.SendMailDTO;
import io.github.ecemgc.employeeservice.exceptions.EmailSendException;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    @Value("${appConfig.isNotificationSync}")
    private Boolean isSync;

    private final RabbitTemplate rabbitTemplate;
    private final NotificationServiceClient notificationServiceClient;
    private final RabbitMQConfigurationProperties rabbitMQConfigurationProperties;

    @Override
    public void sendEmail(SendMailDTO sendMailDTO) {
        if(isSync) {
            try{
                notificationServiceClient.sendEmail(sendMailDTO);
            }catch (Exception e){
                throw new EmailSendException("Failed to send email via FeignClient", e);
            }
        } else {
            try {
                rabbitTemplate.convertAndSend(rabbitMQConfigurationProperties.getQueues().getNotification(), sendMailDTO);
            }catch (Exception e){
                throw new EmailSendException("Failed to send email via RabbitMQ", e);
            }
        }

    }
}
