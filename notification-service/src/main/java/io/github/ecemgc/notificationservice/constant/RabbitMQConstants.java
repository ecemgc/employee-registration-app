package io.github.ecemgc.notificationservice.constant;

public final class RabbitMQConstants {

    public RabbitMQConstants() {
        throw new RuntimeException("This is a constant class!");
    }
    public static final String NOTIFICATION_QUEUE  = "${config.rabbitmq.queues.notification}";

}
