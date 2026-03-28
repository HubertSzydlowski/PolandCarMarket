package com.app.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserPageDto {

    // Static statistics
    private Long advertisementViews;        // Number of advertisement views
    private Long callButtonClicks;          // Number of "Call" button clicks
    private Long messageButtonClicks;       // Number of "Send message" button clicks

    // Dynamic statistics
    private Double avgAdvertisementPrice;   // Average advertisement price
    private Double minAdvertisementPrice;   // Minimum advertisement price
    private Double maxAdvertisementPrice;   // Maximum advertisement price
    private Double medianAdvertisementPrice; // Median advertisement price
    private Double avgVehicleMileage;       // Average vehicle mileage
    private Long minVehicleMileage;         // Minimum vehicle mileage
    private Long maxVehicleMileage;         // Maximum vehicle mileage
    private Long vehiclesWithWarranty;      // Number of vehicles with warranty
    private Double usedVsNewVehiclesPercentage; // Percentage of new vs used vehicles in ads
    private String top5Brands;
    private String top5Models;

    // Vehicle statistics distribution
    private String fuelTypeDistribution;    // Distribution of vehicles by fuel type
    private String transmissionTypeDistribution; // Distribution of vehicles by transmission type

    // Statistics update timestamp
    private LocalDateTime timestamp;
}
