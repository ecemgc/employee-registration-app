
# employee-registration-app
Microservices-based employee management platform developed with Spring Boot and React, featuring Eureka for service discovery, RabbitMQ for messaging, and Docker for containerization.

## Technologies Used

### Architecture
- **Microservices**: The system is designed with a microservices architecture.

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Material-UI (MUI)**: A popular React UI framework that implements Google's Material Design.
- **Redux**: A predictable state container for JavaScript apps.
- **Redux Saga**: A middleware library for managing side effects, such as data fetching and asynchronous actions.
- **Axios**: A promise-based HTTP client for making requests.

### Backend
The backend consists of two separate microservices:
1. **Personnel Backend (Java)**: Handles employee management functionalities.
2. **Notification Backend (Java)**: Sends emails when changes occur in the employee data. The two services communicate with each other via a messaging queue.

### Backend Technologies
- **Spring Boot**: A framework for building production-ready applications quickly in Java.
- **Spring Security**: Provides comprehensive security services for Java EE-based enterprise software applications.
- **Spring Data**: Simplifies data access, significantly reducing the amount of boilerplate code.
- **Spring Validation**: Handles validation in Spring applications.
- **REST**: An architectural style for designing networked applications.
- **AOP (Aspect-Oriented Programming)**: Used to log method calls in service classes, allowing for cross-cutting concerns like logging to be handled cleanly.
- **Maven**: A build automation tool used primarily for Java projects.
- **Swagger**: A framework for API documentation.
- **SLF4J**: A simple logging facade for Java.
- **RabbitMQ**: A message broker used for inter-service communication.
- **Eureka**: A service discovery tool used in microservices architecture.
- **FeignClient**: A declarative web service client that simplifies HTTP API calls.


