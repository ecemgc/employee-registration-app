package io.github.ecemgc.notificationservice.config.rabbitmq;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;


@Configuration
@ConfigurationProperties(prefix = "config.rabbitmq")
@Getter
@Setter
public class RabbitMQConfigurationProperties {

    private String host;
    private Integer port;
    private String username;
    private String password;
    private Queues queues;

    @Getter
    @Setter
    public static class Queues {
        private String notification;
    }
}