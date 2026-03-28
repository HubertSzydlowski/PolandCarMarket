package com.app.repository;

import com.app.model.Vehicle;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long>, JpaSpecificationExecutor<Vehicle> {

    // Custom query method to find a Vehicle by its associated Advertisement ID
    Optional<Vehicle> findByAdvertisement_Id(Long advertisementId);

    // Custom query method to check if a Vehicle exists with a given Advertisement ID
    boolean existsByAdvertisement_Id(Long advertisementId);

    // Method to retrieve all vehicles sorted according to the provided sort parameter
    List<Vehicle> findAll(Sort sort);

    // Additional sorting methods
    List<Vehicle> findAllByOrderByPriceAsc();   // Sorting by price in ascending order
    List<Vehicle> findAllByOrderByPriceDesc();  // Sorting by price in descending order
    List<Vehicle> findAllByOrderByMileageAsc(); // Sorting by mileage in ascending order
    List<Vehicle> findAllByOrderByMileageDesc(); // Sorting by mileage in descending order

    // Fuel type distribution query
    @Query("SELECT v.fuelType, COUNT(v) FROM Vehicle v GROUP BY v.fuelType")
    List<Object[]> findFuelTypeDistribution();

    // Transmission type distribution query
    @Query("SELECT v.transmission, COUNT(v) FROM Vehicle v GROUP BY v.transmission")
    List<Object[]> findTransmissionTypeDistribution();

    // Query to find the average vehicle price
    @Query("SELECT AVG(v.price) FROM Vehicle v")
    Double findAvgPrice();

    // Query to find the minimum vehicle price
    @Query("SELECT MIN(v.price) FROM Vehicle v")
    Double findMinPrice();

    // Query to find the maximum vehicle price
    @Query("SELECT MAX(v.price) FROM Vehicle v")
    Double findMaxPrice();

    // Query to find the median vehicle price
    @Query("SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY v.price) FROM Vehicle v")
    Double findMedianPrice();

    // Query to find the minimum vehicle mileage
    @Query("SELECT MIN(v.mileage) FROM Vehicle v")
    Integer findMinMileage();

    // Query to find the maximum vehicle mileage
    @Query("SELECT MAX(v.mileage) FROM Vehicle v")
    Integer findMaxMileage();

    // Query to find the average vehicle mileage
    @Query("SELECT AVG(v.mileage) FROM Vehicle v")
    Double findAvgMileage();

    // Method to count vehicles with warranty
    long countByHasWarrantyTrue();

    // Method to count vehicles by condition (new, used)
    long countByCondition(Vehicle.Condition condition);

    // Query to retrieve vehicles of a specific user based on the associated advertisement
    @Query("SELECT v FROM Vehicle v WHERE v.advertisement.user.id = :userId")
    List<Vehicle> findVehiclesByUserId(@Param("userId") Long userId);

    // Query to find the fuel type distribution for a specific user's vehicles
    @Query("SELECT CAST(v.fuelType AS string), COUNT(v) FROM Vehicle v WHERE v.advertisement.user.id = :userId GROUP BY v.fuelType")
    List<Object[]> findFuelTypeDistributionForUser(@Param("userId") Long userId);

    // Query to find the transmission type distribution for a specific user's vehicles
    @Query("SELECT CAST(v.transmission AS string), COUNT(v) FROM Vehicle v WHERE v.advertisement.user.id = :userId GROUP BY v.transmission")
    List<Object[]> findTransmissionTypeDistributionForUser(@Param("userId") Long userId);

    // Query to find the average price of a specific user's vehicles
    @Query("SELECT AVG(v.price) FROM Vehicle v WHERE v.advertisement.user.id = :userId")
    Double findAvgPriceForUser(@Param("userId") Long userId);

    // Query to find the minimum price of a specific user's vehicles
    @Query("SELECT MIN(v.price) FROM Vehicle v WHERE v.advertisement.user.id = :userId")
    Double findMinPriceForUser(@Param("userId") Long userId);

    // Query to find the maximum price of a specific user's vehicles
    @Query("SELECT MAX(v.price) FROM Vehicle v WHERE v.advertisement.user.id = :userId")
    Double findMaxPriceForUser(@Param("userId") Long userId);

    // Query to find the median price of a specific user's vehicles
    @Query("SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY v.price) FROM Vehicle v WHERE v.advertisement.user.id = :userId")
    Double findMedianPriceForUser(@Param("userId") Long userId);

    // Query to find the minimum mileage of a specific user's vehicles
    @Query("SELECT MIN(v.mileage) FROM Vehicle v WHERE v.advertisement.user.id = :userId")
    Long findMinMileageForUser(@Param("userId") Long userId);

    // Query to find the maximum mileage of a specific user's vehicles
    @Query("SELECT MAX(v.mileage) FROM Vehicle v WHERE v.advertisement.user.id = :userId")
    Long findMaxMileageForUser(@Param("userId") Long userId);

    // Query to find the average mileage of a specific user's vehicles
    @Query("SELECT AVG(v.mileage) FROM Vehicle v WHERE v.advertisement.user.id = :userId")
    Double findAvgMileageForUser(@Param("userId") Long userId);

    // Query to count the number of vehicles with warranty for a specific user
    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.advertisement.user.id = :userId AND v.hasWarranty = true")
    Long countVehiclesWithWarrantyForUser(@Param("userId") Long userId);

    // Query to count the number of vehicles of a specific condition for a specific user
    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.advertisement.user.id = :userId AND v.condition = :condition")
    Long countVehiclesByConditionForUser(@Param("userId") Long userId, @Param("condition") Vehicle.Condition condition);

    @Query("SELECT v.brand FROM Vehicle v GROUP BY v.brand ORDER BY COUNT(v) DESC")
    List<String> findTopBrands(org.springframework.data.domain.Pageable pageable);

    @Query("SELECT v.model FROM Vehicle v GROUP BY v.model ORDER BY COUNT(v) DESC")
    List<String> findTopModels(org.springframework.data.domain.Pageable pageable);

    @Query(value = "SELECT v.brand, COUNT(*) as cnt " +
            "FROM vehicles v " +
            "JOIN advertisements a ON v.advertisement_id = a.id " +
            "WHERE a.user_id = :userId " +
            "GROUP BY v.brand " +
            "ORDER BY cnt DESC LIMIT 5", nativeQuery = true)
    List<Object[]> findTopBrandsForUser(@Param("userId") Long userId);

    @Query(value = "SELECT v.model, COUNT(*) as cnt " +
            "FROM vehicles v " +
            "JOIN advertisements a ON v.advertisement_id = a.id " +
            "WHERE a.user_id = :userId " +
            "GROUP BY v.model " +
            "ORDER BY cnt DESC LIMIT 5", nativeQuery = true)
    List<Object[]> findTopModelsForUser(@Param("userId") Long userId);

}
