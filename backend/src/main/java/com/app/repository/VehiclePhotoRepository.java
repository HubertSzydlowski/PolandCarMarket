package com.app.repository;

import com.app.model.Vehicle;
import com.app.model.VehiclePhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehiclePhotoRepository extends JpaRepository<VehiclePhoto, Long> {

    // Custom query method to find a VehiclePhoto by its associated vehicle and whether it is marked as the main photo
    Optional<VehiclePhoto> findByVehicleAndIsMain(Vehicle vehicle, Boolean isMain);

    // Custom query method to gets all photos associated with the vehicle
    List<VehiclePhoto> findAllByVehicle_Id(Long vehicleId);

}