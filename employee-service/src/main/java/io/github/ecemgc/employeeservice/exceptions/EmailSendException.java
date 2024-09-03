package io.github.ecemgc.employeeservice.exceptions;

public class EmailSendException extends RuntimeException{
    public EmailSendException(String message, Throwable throwable){
        super(message, throwable);
    }
}
