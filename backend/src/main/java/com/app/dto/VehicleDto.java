package com.app.dto;

import com.app.model.Vehicle;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

// DTO for vehicle-related data
@Data
@AllArgsConstructor
public class VehicleDto {

    private Long id; // Unique identifier for the vehicle

    @NotNull(message = "Brand is mandatory") // Brand must not be null
    private Vehicle.Brand brand;

    @NotNull(message = "Model is mandatory") // Model must not be null
    private Vehicle.Model model;

    @NotNull(message = "Year is mandatory") // Year must not be null
    @Positive(message = "Year must be positive") // Year must be a positive number
    private Integer year;

    @NotNull(message = "Price is mandatory") // Price must not be null
    @Positive(message = "Price must be positive") // Price must be a positive number
    private Double price;

    @NotNull(message = "Fuel type is mandatory") // Fuel type must not be null
    private Vehicle.FuelType fuelType;

    @NotNull(message = "Transmission type is mandatory") // Transmission type must not be null
    private Vehicle.TransmissionType transmission;

    @NotBlank(message = "Color is mandatory") // Color must not be blank
    @Size(min = 1, max = 20, message = "Color must be between 1 and 20 characters") // Color length constraints
    private String color;

    @Positive(message = "Mileage must be positive") // Mileage must be a positive number
    private Integer mileage;

    @Min(value = 0, message = "Power must be zero or positive") // Power must be zero or positive
    private Integer power;

    @Min(value = 1, message = "Seats must be at least 1") // Seats must be at least 1
    @Max(value = 8, message = "Seats cannot exceed 8") // Seats cannot exceed 8
    private Integer seats;

    @Size(max = 2000, message = "Description must be up to 2000 characters") // Description length constraint
    private String description;

    @NotBlank(message = "VIN is mandatory") // VIN must not be blank
    @Size(min = 17, max = 17, message = "VIN must be exactly 17 characters") // VIN length constraint
    private String vin;

    @NotNull(message = "Condition is mandatory") // Condition must not be null
    private Vehicle.Condition condition;

    @NotNull(message = "Warranty status is mandatory") // Warranty status must not be null
    private Boolean hasWarranty;

    @NotNull(message = "Advertisement ID is mandatory") // Advertisement ID must not be null
    private Long advertisementId;

    // Default constructor
    public VehicleDto() {}
}
