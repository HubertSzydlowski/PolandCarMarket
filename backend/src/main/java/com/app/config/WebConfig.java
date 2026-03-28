package com.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Absolute path to the vehicle_photos directory
        Path vehiclePhotosDir = Paths.get("C:/Users/Hubert/Documents/PCM/vehicle_photos");
        String vehiclePhotosPath = vehiclePhotosDir.toFile().getAbsolutePath();

        // URL mapping e.g. http://localhost:8080/photos/1photos/file.jpg
        registry.addResourceHandler("/photos/**")
                .addResourceLocations("file:" + vehiclePhotosPath + "/");
    }
}
