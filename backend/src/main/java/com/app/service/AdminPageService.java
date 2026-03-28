package com.app.service;

import com.app.dto.AdminPageDto;
import com.app.model.AdminPage;
import com.app.model.User;
import com.app.model.Vehicle;
import com.app.repository.AdminPageRepository;
import com.app.repository.AdvertisementRepository;
import com.app.repository.UserRepository;
import com.app.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminPageService {

    @Autowired
    private AdminPageRepository adminPageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    // Method to get data for the dashboard within a given time range
    public AdminPageDto getAdminDashboardData(LocalDateTime start, LocalDateTime end) {
        AdminPageDto dto = new AdminPageDto();

        try {
            // Fetch static data from the admin_stats table within the given period
            List<AdminPage> statsList = adminPageRepository.findAllByTimestampBetween(start, end);

            if (statsList.isEmpty()) {
                throw new RuntimeException("No statistics found for the given period.");
            }

            // Assuming the most recent record is desired
            AdminPage latestStats = statsList.get(statsList.size() - 1);

            // Convert JSON to List<String>
            dto.setTop5Brands(latestStats.getTop5Brands());
            dto.setTop5Models(latestStats.getTop5Models());
            dto.setFuelTypeDistribution(latestStats.getFuelTypeDistribution());
            dto.setTransmissionTypeDistribution(latestStats.getTransmissionTypeDistribution());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving admin data: " + e.getMessage(), e);
        }

        try {
            // Fetch dynamic data (from existing tables)
            dto.setTotalUsers(userRepository.count());
            dto.setTotalAdvertisements(advertisementRepository.count());
            dto.setTotalVehicles(vehicleRepository.count());

            // Count active users
            dto.setActiveUsersCount(userRepository.countByEnabledTrue());

            // Calculate average advertisements per user
            double avgAdvertisementsPerUser = (dto.getTotalUsers() == 0) ? 0 : (double) dto.getTotalAdvertisements() / dto.getTotalUsers();
            dto.setAvgAdvertisementsPerUser(avgAdvertisementsPerUser);

            // Count users with roles ADMIN and USER
            dto.setUsersWithRoleAdmin(userRepository.countByRole(User.Role.ADMIN));
            dto.setUsersWithRoleUser(userRepository.countByRole(User.Role.USER));

            // Count inactive users
            dto.setInactiveUsers(userRepository.countByEnabledFalse());

            // Get users with the most advertisements
            dto.setUsersWithMostAdvertisements(userRepository.findUsersWithMostAdvertisements());

            // Vehicle statistics
            dto.setAvgVehiclePrice(vehicleRepository.findAvgPrice());
            dto.setMinVehiclePrice(vehicleRepository.findMinPrice());
            dto.setMaxVehiclePrice(vehicleRepository.findMaxPrice());
            dto.setMedianVehiclePrice(vehicleRepository.findMedianPrice());

            dto.setAvgVehicleMileage(vehicleRepository.findAvgMileage());

            // Count vehicles with warranty
            dto.setVehiclesWithWarranty(vehicleRepository.countByHasWarrantyTrue());

            // Fuel type distribution
            List<String> fuelTypes = vehicleRepository.findFuelTypeDistribution().stream()
                    .map(obj -> obj[0].toString())
                    .collect(Collectors.toList());
            dto.setFuelTypeDistribution(fuelTypes);

            // Transmission type distribution
            List<String> transmissionTypes = vehicleRepository.findTransmissionTypeDistribution().stream()
                    .map(obj -> obj[0].toString())
                    .collect(Collectors.toList());
            dto.setTransmissionTypeDistribution(transmissionTypes);

            // Vehicle statistics
            dto.setMinVehicleMileage(vehicleRepository.findMinMileage().longValue());
            dto.setMaxVehicleMileage(vehicleRepository.findMaxMileage().longValue());

            // Top 5 Brands
            List<String> topBrands = vehicleRepository.findTopBrands(PageRequest.of(0, 5));
            dto.setTop5Brands(topBrands);

            // Top 5 Models
            List<String> topModels = vehicleRepository.findTopModels(PageRequest.of(0, 5));
            dto.setTop5Models(topModels);


            // Split vehicles into new and used
            dto.setNewVehicles(vehicleRepository.countByCondition(Vehicle.Condition.NEW));
            dto.setUsedVehicles(vehicleRepository.countByCondition(Vehicle.Condition.USED));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving dynamic data: " + e.getMessage(), e);
        }

        return dto;
    }

    // Method to save admin statistics every hour
    @Scheduled(cron = "0 0 * * * ?")  // Scheduled to run at the beginning of every hour
    public void saveAdminStats() {
        try {
            AdminPage adminPage = new AdminPage();

            adminPage.setTimestamp(LocalDateTime.now());  // Set the current timestamp for when the statistics are saved

            // Save the generated statistics data into the database
            adminPageRepository.save(adminPage);
        } catch (Exception e) {
            throw new RuntimeException("Error saving admin stats: " + e.getMessage(), e);
        }
    }
}