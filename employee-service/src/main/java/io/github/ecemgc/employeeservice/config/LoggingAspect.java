package io.github.ecemgc.employeeservice.config;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
public class LoggingAspect {

    @Before("execution(* io.github.ecemgc.employeeservice.service.*.impl.*.*(..))")
    public void logBeforeMethodCall(JoinPoint joinPoint){
        log.info("Method called: {}", joinPoint.getSignature().getName());
    }

}
