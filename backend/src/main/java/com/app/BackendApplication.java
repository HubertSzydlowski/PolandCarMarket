package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.app.repository")
@EntityScan(basePackages = "com.app.model")
@EnableScheduling  // Aktywacja obsługi zadań cyklicznych
public class BackendApplication {


    // The main method that launches the Spring Boot application
    public static void main(String[] args) {
        // Runs the application by calling SpringApplication.run() and passing the current class and command-line arguments
        SpringApplication.run(BackendApplication.class, args);
    }
}



