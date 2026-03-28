package com.app.dto;

import lombok.Data;

import java.util.List;

@Data
public class AdminPageDto {

    // Static statistics
    private Long homepageVisits;                // Number of visits to the homepage
    private Long searchPageVisits;              // Number of visits to the search page
    private Long advertisementPageVisits;       // Number of visits to advertisement details pages

    private Long callButtonClicks;              // Number of clicks on the "Call" button
    private Long messageButtonClicks;           // Number of clicks on the "Message" button

    private Long dailyLogins;                   // Number of user logins per day
    private Long dailyRegistrations;            // Number of user registrations per day

    private Double avgTimeSpentOnSite;          // Average time spent on the site (in seconds or minutes, tracked by frontend)

    private Long activeUsers;                   // Number of active users (could be users with recent activity)
    private Long advertisementsAddedPerUser;    // Average number of advertisements added per user
    private Long advertisementEditsOrDeletions; // Total number of advertisement edits or deletions

    private Long mostViewedAdvertisements;      // Number of views on the most popular advertisement

    // Dynamic statistics (refreshed on request)
    private Long totalUsers;                    // Total number of users
    private Long activeUsersCount;              // Number of currently active users (e.g. logged in recently)
    private Long totalAdvertisements;           // Total number of advertisements
    private Long totalVehicles;                 // Total number of vehicles

    // Statistics based on the User table
    private Long usersWithRoleAdmin;            // Number of users with the ADMIN role
    private Long usersWithRoleUser;             // Number of users with the USER role
    private Long inactiveUsers;                 // Number of inactive users (e.g. no login in X days)
    private List<String> usersWithMostAdvertisements; // List of usernames or emails with the most advertisements
    private Double avgAdvertisementsPerUser;    // Average number of advertisements per user

    // Statistics based on the Vehicle table
    private List<String> top5Brands;                   // Top 5 vehicle brands by number of listings
    private List<String> top5Models;                   // Top 5 vehicle models
    private List<String> fuelTypeDistribution;         // Distribution of fuel types (e.g. Diesel, Petrol, Hybrid)
    private List<String> transmissionTypeDistribution; // Distribution of transmission types (e.g. Manual, Automatic)

    private Double avgVehiclePrice;              // Average price of listed vehicles
    private Double minVehiclePrice;              // Minimum price of a vehicle
    private Double maxVehiclePrice;              // Maximum price of a vehicle
    private Double medianVehiclePrice;           // Median price of listed vehicles

    private Long minVehicleMileage;              // Minimum mileage among listed vehicles
    private Long maxVehicleMileage;              // Maximum mileage
    private Double avgVehicleMileage;            // Average vehicle mileage

    private Long vehiclesWithWarranty;           // Number of vehicles with warranty included

    private Long newVehicles;                    // Number of new vehicles
    private Long usedVehicles;                   // Number of used vehicles

    // Custom getters and setters
    public Long getNewVehicles() {
        return newVehicles;
    }

    public void setNewVehicles(Long newVehicles) {
        this.newVehicles = newVehicles;
    }

    public Long getUsedVehicles() {
        return usedVehicles;
    }

    public void setUsedVehicles(Long usedVehicles) {
        this.usedVehicles = usedVehicles;
    }
}
