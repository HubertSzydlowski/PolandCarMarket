package com.app.controller;

import com.app.dto.VehicleDto;
import com.app.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller for managing vehicles
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // Returns a vehicle by ID
    @GetMapping("/{id}")
    public ResponseEntity<VehicleDto> getVehicleById(@PathVariable Long id) {
        VehicleDto vehicleDto = vehicleService.getVehicleById(id);
        if (vehicleDto != null) {
            return ResponseEntity.ok(vehicleDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Creates a new vehicle
    @PostMapping
    public VehicleDto createVehicle(@Valid @RequestBody VehicleDto vehicleDto) {
        return vehicleService.createVehicle(vehicleDto);
    }

    // Updates a vehicle by ID
    @PutMapping("/{id}")
    public VehicleDto updateVehicle(@PathVariable Long id, @Valid @RequestBody VehicleDto vehicleDto) {
        return vehicleService.updateVehicle(id, vehicleDto);
    }

    // Deletes a vehicle by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }

    // Returns a vehicle by advertisementId
    @GetMapping("/by-advertisement/{advertisementId}")
    public ResponseEntity<VehicleDto> getVehicleByAdvertisementId(@PathVariable Long advertisementId) {
        try {
            VehicleDto vehicleDto = vehicleService.getVehicleByAdvertisementId(advertisementId);
            return ResponseEntity.ok(vehicleDto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Returns all vehicles belonging to a user
    @GetMapping("/by-user/{userId}")
    public List<VehicleDto> getVehiclesByUser(@PathVariable Long userId) {
        return vehicleService.getVehiclesByUser(userId);
    }

    // Returns vehicles with optional filters and sorting
    @GetMapping
    public List<VehicleDto> getVehicles(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer minMileage,
            @RequestParam(required = false) Integer maxMileage,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order
    ) {
        return vehicleService.getVehicles(
                brand, model, year,
                minPrice, maxPrice,
                minMileage, maxMileage,
                fuelType, transmission,
                sortBy, order
        );
    }

}
