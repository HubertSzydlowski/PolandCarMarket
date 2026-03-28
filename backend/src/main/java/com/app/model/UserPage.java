package com.app.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_stats")
@Data
public class UserPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")  // Reference to the User table
    private User user;

    // Dynamic statistics regarding the user's advertisements and vehicles
    private Double avgAdvertisementPrice;       // Average advertisement price
    private Double minAdvertisementPrice;       // Minimum advertisement price
    private Double maxAdvertisementPrice;       // Maximum advertisement price
    private Double medianAdvertisementPrice;    // Median advertisement price
    private Double avgVehicleMileage;           // Average mileage of vehicles in advertisements
    private Integer minVehicleMileage;             // Minimum vehicle mileage
    private Integer maxVehicleMileage;             // Maximum vehicle mileage
    private Integer vehiclesWithWarranty;          // Number of vehicles with a warranty
    private Double usedVsNewVehiclesPercentage; // Percentage of advertisements with new vs. used vehicles


    // Distribution of vehicle statistics
    private String fuelTypeDistribution;        // Distribution of vehicles by fuel type (percentage)
    private String transmissionTypeDistribution; // Distribution of vehicles by transmission type (percentage)

    @Column(name = "top_brands")
    private String top5Brands;

    @Column(name = "top_models")
    private String top5Models;
    
    // Timestamp for the statistics
    private LocalDateTime timestamp;            // Time of the last statistics record (e.g., daily)
}

