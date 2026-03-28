package com.app.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.Data;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Collections;

@Entity
@Table(name = "admin_stats")
@Data
public class AdminPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime timestamp;             // Timestamp of when these stats were recorded

    // Statistics from User table
    private Integer usersWithRoleAdmin;
    private Integer usersWithRoleUser;
    private Integer inactiveUsers;

    // Statistics from Vehicle table
    private Double avgVehiclePrice;
    private Double minVehiclePrice;
    private Double maxVehiclePrice;
    private Double medianVehiclePrice;

    private Integer minVehicleMileage;
    private Integer maxVehicleMileage;
    private Double avgVehicleMileage;

    private Integer vehiclesWithWarranty;
    private Integer newVsUsedVehicles;

    // JSON fields stored as String in DB
    @Column(name = "top_brands")
    private String top5Brands;

    @Column(name = "top_models")
    private String top5Models;

    @Column(name = "fuel_type_distribution")
    private String fuelTypeDistribution;

    @Column(name = "transmission_type_distribution")
    private String transmissionTypeDistribution;

    // Getters and setters with JSON conversion using Jackson ObjectMapper

    public List<String> getTop5Brands() {
        return convertJsonToList(top5Brands);
    }

    public void setTop5Brands(List<String> top5Brands) {
        this.top5Brands = convertListToJson(top5Brands);
    }

    public List<String> getTop5Models() {
        return convertJsonToList(top5Models);
    }

    public void setTop5Models(List<String> top5Models) {
        this.top5Models = convertListToJson(top5Models);
    }

    public List<String> getFuelTypeDistribution() {
        return convertJsonToList(fuelTypeDistribution);
    }

    public void setFuelTypeDistribution(List<String> fuelTypeDistribution) {
        this.fuelTypeDistribution = convertListToJson(fuelTypeDistribution);
    }

    public List<String> getTransmissionTypeDistribution() {
        return convertJsonToList(transmissionTypeDistribution);
    }

    public void setTransmissionTypeDistribution(List<String> transmissionTypeDistribution) {
        this.transmissionTypeDistribution = convertListToJson(transmissionTypeDistribution);
    }

    // JSON <-> List<String> conversion logic
    private String convertListToJson(List<String> list) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(list);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private List<String> convertJsonToList(String json) {
        if (json == null || json.isEmpty()) {
            return Collections.emptyList();
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(json, List.class);
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
