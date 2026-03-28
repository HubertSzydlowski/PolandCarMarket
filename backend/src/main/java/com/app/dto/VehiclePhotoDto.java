package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// DTO for vehicle photo-related data
@Data
@AllArgsConstructor
public class VehiclePhotoDto {

    private Long id; // Unique identifier for the vehicle photo

    private String photoUrl; // URL of the vehicle photo

    private Long vehicleId; // ID of the vehicle associated with the photo

    // Default constructor
    public VehiclePhotoDto() {}
}