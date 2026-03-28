package com.app.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//  Configuration class for OpenAPI setup.

@Configuration
public class OpenApiConfig {

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public") // Sets the API group name to "public"
                .pathsToMatch("/**")  // Match all paths for documentation
                .build();
    }
}