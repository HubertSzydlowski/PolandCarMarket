package com.app.controller;

import com.app.dto.VehiclePhotoDto;
import com.app.model.VehiclePhoto;
import com.app.service.VehiclePhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

// Controller for managing vehicle photos
@RestController
@RequestMapping("/vehicle-photos")
public class VehiclePhotoController {

    @Autowired
    private VehiclePhotoService vehiclePhotoService;

    // Returns all vehicle photos
    @GetMapping
    public List<VehiclePhotoDto> getAllPhotos() {
        return vehiclePhotoService.getAllPhotos();
    }

    // Returns a vehicle photo by ID
    @GetMapping("/{id}")
    public ResponseEntity<VehiclePhotoDto> getPhotoById(@PathVariable Long id) {
        VehiclePhotoDto photoDto = vehiclePhotoService.getPhotoById(id);
        if (photoDto != null) {
            return ResponseEntity.ok(photoDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Adds a photo to a specific vehicle
    @PostMapping
    public ResponseEntity<VehiclePhoto> addPhotoToVehicle(
            @RequestParam Long vehicleId,
            @RequestParam MultipartFile photo,
            @RequestParam Boolean isMain,
            @RequestParam String username) throws IOException {
        try {
            VehiclePhoto vehiclePhoto = vehiclePhotoService.addPhotoToVehicle(vehicleId, photo, isMain, username);
            return ResponseEntity.ok(vehiclePhoto);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store photo", e);
        }
    }

    // Deletes a vehicle photo by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        vehiclePhotoService.deletePhoto(id);
        return ResponseEntity.noContent().build();
    }

    // Returns all photos for a specific vehicle
    @GetMapping("/by-vehicle/{vehicleId}")
    public List<VehiclePhotoDto> getPhotosByVehicleId(@PathVariable Long vehicleId) {
        return vehiclePhotoService.getPhotosByVehicleId(vehicleId);
    }
}