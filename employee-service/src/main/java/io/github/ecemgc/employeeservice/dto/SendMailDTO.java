package io.github.ecemgc.employeeservice.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
public class SendMailDTO {
    private String to;
    private String from;
    private String text;
    private String subject;
    private List<String> ccList;
    private List<String> bccList;
    private String replyTo;
}
