package com.app.service;

import com.app.dto.VehiclePhotoDto;
import com.app.model.Vehicle;
import com.app.model.VehiclePhoto;
import com.app.repository.VehiclePhotoRepository;
import com.app.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehiclePhotoService {

    @Autowired
    private VehicleRepository vehicleRepository; // Injected repository for interacting with vehicle data

    @Autowired
    private VehiclePhotoRepository vehiclePhotoRepository; // Injected repository for interacting with vehicle photos

    // Method to get all vehicle photos as DTOs
    public List<VehiclePhotoDto> getAllPhotos() {
        // Fetch all vehicle photos, map them to DTOs, and return the list
        return vehiclePhotoRepository.findAll().stream()
                .map(this::convertToDto) // Convert each VehiclePhoto to VehiclePhotoDto
                .collect(Collectors.toList());
    }

    // Method to get a specific vehicle photo by its ID
    public VehiclePhotoDto getPhotoById(Long id) {
        Optional<VehiclePhoto> photo = vehiclePhotoRepository.findById(id); // Search for the photo by ID
        return photo.map(this::convertToDto).orElse(null); // If found, convert to DTO, otherwise return null
    }

    // Method to add a photo to a vehicle
    public VehiclePhoto addPhotoToVehicle(Long vehicleId, MultipartFile photo, Boolean isMain, String username) throws IOException {
        Optional<Vehicle> vehicleOptional = vehicleRepository.findById(vehicleId); // Find the vehicle by ID

        if (vehicleOptional.isPresent()) {
            Vehicle vehicle = vehicleOptional.get(); // Get the vehicle object

            // If the photo is marked as main, check if there is already a main photo
            if (isMain) {
                Optional<VehiclePhoto> existingMainPhoto = vehiclePhotoRepository.findByVehicleAndIsMain(vehicle, true);
                if (existingMainPhoto.isPresent()) {
                    throw new RuntimeException("Main photo already exists for this vehicle."); // If main photo exists, throw exception
                }
            }

            // Define the directory where photos will be stored
            String vehiclePhotosDir = "C:/Users/Hubert/Documents/PCM/vehicle_photos/";
            File vehicleFolder = new File(vehiclePhotosDir + vehicle.getId() + "photos");

            // Create the directory if it does not exist
            if (!vehicleFolder.exists()) {
                vehicleFolder.mkdirs();
            }

            // Generate a unique file name based on the username and current timestamp
            String fileName = username + "_" + System.currentTimeMillis() + "." + getFileExtension(photo.getOriginalFilename());
            Path destinationPath = Paths.get(vehicleFolder.getAbsolutePath(), fileName); // Define the path where the photo will be stored

            // Copy the file to the destination path
            Files.copy(photo.getInputStream(), destinationPath);

            // Construct the URL to the saved photo
            String savedPhotoUrl = vehicle.getId() + "photos/" + destinationPath.getFileName().toString();

            // Create a new VehiclePhoto object and save it to the repository
            VehiclePhoto vehiclePhoto = new VehiclePhoto(savedPhotoUrl, vehicle, isMain);
            return vehiclePhotoRepository.save(vehiclePhoto); // Save the photo and return the saved entity
        }

        // If vehicle not found, throw an exception
        throw new RuntimeException("Vehicle not found");
    }

    // Helper method to extract file extension from the filename
    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf("."); // Find the last dot in the filename
        if (dotIndex > 0) {
            return filename.substring(dotIndex + 1); // Return the substring after the dot (file extension)
        }
        return ""; // Return an empty string if no extension is found
    }

    // Method to delete a photo by its ID
    public void deletePhoto(Long id) {
        Optional<VehiclePhoto> photoOptional = vehiclePhotoRepository.findById(id); // Fetch the photo by ID

        if (photoOptional.isPresent()) {
            VehiclePhoto photo = photoOptional.get(); // Get the photo object

            // Define the path to the photo on disk
            String vehiclePhotosDir = "C:/Users/Hubert/Documents/PCM/vehicle_photos/";
            Path photoPath = Paths.get(vehiclePhotosDir, photo.getPhotoUrl());

            // Delete the file from disk
            try {
                Files.deleteIfExists(photoPath); // Delete the file if it exists
            } catch (IOException e) {
                throw new RuntimeException("Error deleting photo from disk: " + e.getMessage());
            }

            // Now, delete the photo from the database
            vehiclePhotoRepository.deleteById(id); // Delete the photo record from the database
        } else {
            throw new RuntimeException("Photo not found");
        }
    }

    public List<VehiclePhotoDto> getPhotosByVehicleId(Long vehicleId) {
        return vehiclePhotoRepository.findAllByVehicle_Id(vehicleId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Helper method to convert a VehiclePhoto entity to a VehiclePhotoDto
    private VehiclePhotoDto convertToDto(VehiclePhoto photo) {
        return new VehiclePhotoDto(
                photo.getId(), // Photo ID
                photo.getPhotoUrl(), // URL of the photo
                photo.getVehicle().getId() // Vehicle ID associated with the photo
        );
    }
}