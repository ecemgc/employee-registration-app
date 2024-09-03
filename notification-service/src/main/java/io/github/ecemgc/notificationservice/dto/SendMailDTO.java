package io.github.ecemgc.notificationservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SendMailDTO {
    private String to;
    private String from;
    private String text;
    private String subject;
    private List<String> ccList;
    private List<String> bccList;
    private String replyTo;
}

