package com.app.service;

import com.app.dto.UserPageDto;
import com.app.model.User;
import com.app.model.UserPage;
import com.app.model.Vehicle;
import com.app.repository.UserPageRepository;
import com.app.repository.UserRepository;
import com.app.repository.VehicleRepository;
import com.app.security.JWTUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserPageService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserPageRepository userPageRepository;

    @Autowired
    private JWTUtility jWTUtility;

    @Autowired
    private UserRepository userRepository;

    // Method to get user statistics (vehicle price, mileage, warranty, etc.)
    public UserPageDto getUserStats() {
        User currentUser = jWTUtility.getCurrentUser();  // Get the currently logged-in user
        if (currentUser == null) {
            throw new IllegalArgumentException("User not found.");  // Using IllegalArgumentException as an example
        }

        Long userId = currentUser.getId(); // Get the user's ID

        UserPageDto userPageDto = new UserPageDto();

        try {
            // Gather statistics data from repositories
            userPageDto.setAvgAdvertisementPrice(vehicleRepository.findAvgPriceForUser(userId));
            userPageDto.setMinAdvertisementPrice(vehicleRepository.findMinPriceForUser(userId));
            userPageDto.setMaxAdvertisementPrice(vehicleRepository.findMaxPriceForUser(userId));
            userPageDto.setMedianAdvertisementPrice(vehicleRepository.findMedianPriceForUser(userId));
            userPageDto.setAvgVehicleMileage(vehicleRepository.findAvgMileageForUser(userId));
            userPageDto.setMinVehicleMileage(vehicleRepository.findMinMileageForUser(userId));
            userPageDto.setMaxVehicleMileage(vehicleRepository.findMaxMileageForUser(userId));
            userPageDto.setVehiclesWithWarranty(vehicleRepository.countVehiclesWithWarrantyForUser(userId));
            userPageDto.setUsedVsNewVehiclesPercentage(calculateUsedVsNewPercentage(userId));

            // Fuel type and transmission type distribution
            userPageDto.setFuelTypeDistribution(convertToDistributionString(vehicleRepository.findFuelTypeDistributionForUser(userId)));
            userPageDto.setTransmissionTypeDistribution(convertToDistributionString(vehicleRepository.findTransmissionTypeDistributionForUser(userId)));

            // Top 5 brands and models
            List<Object[]> topBrands = vehicleRepository.findTopBrandsForUser(userId);
            List<Object[]> topModels = vehicleRepository.findTopModelsForUser(userId);
            userPageDto.setTop5Brands(convertListToString(topBrands));
            userPageDto.setTop5Models(convertListToString(topModels));

        } catch (Exception ex) {
            throw new RuntimeException("Error retrieving user statistics: " + ex.getMessage());  // Using RuntimeException
        }

        return userPageDto;
    }

    // Helper to convert top list results to a readable string
    private String convertListToString(List<Object[]> list) {
        StringBuilder sb = new StringBuilder();
        for (Object[] entry : list) {
            sb.append(entry[0]).append(" (").append(entry[1]).append("), ");
        }
        if (sb.length() > 0) {
            sb.delete(sb.length() - 2, sb.length());
        }
        return sb.toString();
    }

    // Method to convert fuel type or transmission type distribution data into a JSON-like string
    private String convertToDistributionString(List<Object[]> distributionData) {
        StringBuilder sb = new StringBuilder();
        sb.append("{");

        for (Object[] entry : distributionData) {
            String fuelType = (String) entry[0];
            Long count = (Long) entry[1];
            sb.append("\"").append(fuelType).append("\": ").append(count).append(", ");
        }

        // Remove the last comma and space
        if (sb.length() > 1) {
            sb.delete(sb.length() - 2, sb.length());
        }

        sb.append("}");
        return sb.toString();
    }

    // Method to calculate the percentage of used vehicles vs new vehicles for a user
    private Double calculateUsedVsNewPercentage(Long userId) {
        long newVehicles = vehicleRepository.countVehiclesByConditionForUser(userId, Vehicle.Condition.NEW);
        long usedVehicles = vehicleRepository.countVehiclesByConditionForUser(userId, Vehicle.Condition.USED);
        long totalVehicles = newVehicles + usedVehicles;

        return totalVehicles == 0 ? 0.0 : (double) usedVehicles / totalVehicles * 100;
    }

    // Scheduled method to save user statistics every day at 13:00
    @Scheduled(cron = "0 0 13 * * ?")  // Triggered daily at 1:00 PM
    public void saveUserStats() {
        List<User> users = userRepository.findAll();  // Fetch all users

        try {
            // Loop through all users and save their statistics
            for (User user : users) {
                UserPage userPage = new UserPage();

                // Static data for statistics, hardcoded values
                userPage.setUser(user);

                // Save the statistics to the database with the current timestamp
                userPage.setTimestamp(LocalDateTime.now());
                userPageRepository.save(userPage);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Error saving user statistics: " + ex.getMessage());  // Using RuntimeException
        }
    }

}

