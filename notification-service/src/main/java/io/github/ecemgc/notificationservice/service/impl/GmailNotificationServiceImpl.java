package io.github.ecemgc.notificationservice.service.impl;

import io.github.ecemgc.notificationservice.dto.SendMailDTO;
import io.github.ecemgc.notificationservice.service.intf.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class GmailNotificationServiceImpl implements NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendNotification(SendMailDTO sendMailDTO) {
        sendEmail(sendMailDTO);
    }


    private void sendEmail(SendMailDTO dto) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(dto.getFrom());
            simpleMailMessage.setTo(dto.getTo());
            simpleMailMessage.setCc(dto.getCcList() != null ? dto.getCcList().toArray(new String[0]) : null);
            simpleMailMessage.setCc(dto.getBccList() != null ? dto.getBccList().toArray(new String[0]): null);
            simpleMailMessage.setSubject(dto.getSubject());
            simpleMailMessage.setReplyTo(dto.getReplyTo());
            simpleMailMessage.setReplyTo(dto.getReplyTo());
            simpleMailMessage.setText(dto.getText());
            simpleMailMessage.setSentDate(new Date());
            mailSender.send(simpleMailMessage);
            log.info("Email sent to: {}", dto.getTo());
        } catch (Exception e) {
         log.error("Error when sending mail {}", e.getMessage());
        }

    }
}