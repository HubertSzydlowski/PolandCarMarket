package com.app.controller;

import com.app.dto.*;
import com.app.model.Advertisement;
import com.app.model.User;
import com.app.model.VehiclePhoto;
import com.app.security.JWTUtility;
import com.app.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin-page")
public class AdminPageController {

    private final JWTUtility jwtUtility;
    private final UserService userService;
    private final AdvertisementService advertisementService;
    private final VehicleService vehicleService;
    private final VehiclePhotoService vehiclePhotoService;
    private final AdminPageService adminPageService;

    @Autowired
    public AdminPageController(JWTUtility jwtUtility, UserService userService, AdvertisementService advertisementService, VehicleService vehicleService, VehiclePhotoService vehiclePhotoService, AdminPageService adminPageService) {
        this.jwtUtility = jwtUtility;
        this.userService = userService;
        this.advertisementService = advertisementService;
        this.vehicleService = vehicleService;
        this.vehiclePhotoService = vehiclePhotoService;
        this.adminPageService = adminPageService;
    }

    // Check if the current user has the 'ADMIN' role. If not, throw an exception
    private void ensureAdmin() {
        User currentUser = jwtUtility.getCurrentUser();
        if (!currentUser.getRole().name().equals("ADMIN")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden: You are not an admin");
        }
    }

    // Retrieves the username of the current authenticated user
    private String getCurrentUsername() {
        User currentUser = jwtUtility.getCurrentUser();
        return currentUser.getUsername(); // Assuming JWTUtility has a method for fetching the username
    }

    // === USER OPERATIONS ===

    // Endpoint to retrieve all users, only accessible by admin
    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        ensureAdmin();  // Check if the user has admin privileges
        return userService.getAllUsers();  // Fetch and return all users
    }

    // Endpoint to retrieve a user by their ID, only accessible by admin
    @GetMapping("/users/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        ensureAdmin();  // Check if the user has admin privileges
        UserDto user = userService.getUserById(id);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist");
        }
        return user;
    }

    // Endpoint to register a new user, only accessible by admin
    @PostMapping("/users/register")
    public UserDto createUser(@RequestBody UserDto userDto) {
        ensureAdmin();  // Check if the user has admin privileges
        return userService.createUser(userDto);  // Create and return the new user
    }

    // Endpoint to update user data, only accessible by admin
    @PutMapping("/users/{id}")
    public UserDto updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        ensureAdmin();  // Check if the user has admin privileges
        UserDto updatedUser = userService.updateUser(id, userDto);
        if (updatedUser == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist");
        }
        return updatedUser;
    }

    // Endpoint to delete a user, only accessible by admin
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        ensureAdmin();  // Check if the user has admin privileges
        boolean deleted = userService.deleteUser(id);
        if (!deleted) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist");
        }
    }

    // Endpoint to get favorites of a user, only accessible by admin
    @GetMapping("/users/{userId}/favorites")
    public ResponseEntity<List<Long>> getFavorites(@PathVariable Long userId) {
        ensureAdmin();
        List<Long> favorites = userService.getFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    // Endpoint to add an advertisement to a user's favorites, only accessible by admin
    @PostMapping("/users/{userId}/favorites/{advertisementId}")
    public ResponseEntity<String> addToFavorites(@PathVariable Long userId, @PathVariable Long advertisementId) {
        ensureAdmin();
        userService.addToFavorites(userId, advertisementId);
        return ResponseEntity.ok("Advertisement added to favorites");
    }

    // Endpoint to remove an advertisement from a user's favorites, only accessible by admin
    @DeleteMapping("/users/{userId}/favorites/{advertisementId}")
    public ResponseEntity<String> removeFromFavorites(@PathVariable Long userId, @PathVariable Long advertisementId) {
        ensureAdmin();
        userService.removeFromFavorites(userId, advertisementId);
        return ResponseEntity.ok("Advertisement removed from favorites");
    }

    // === ADVERTISEMENT OPERATIONS ===

    // Endpoint to retrieve all advertisements, paginated, only accessible by admin
    @GetMapping("/advertisements")
    public Page<AdvertisementDto> getAllAdvertisements(Pageable pageable) {
        ensureAdmin();  // Check if the user has admin privileges
        Page<Advertisement> advertisementsPage = advertisementService.getAllAdvertisements(pageable);

        // Mapping from entity to DTO
        return advertisementsPage.map(ad -> new AdvertisementDto(
                ad.getId(),
                ad.getTitle(),
                ad.getUser().getId(), // Returning only the user ID for simplicity
                ad.getPhoneNumber(),
                ad.getGooglePlaceId()
        ));
    }

    // Endpoint to retrieve a single advertisement by ID, only accessible by admin
    @GetMapping("/advertisements/{id}")
    public ResponseEntity<AdvertisementDto> getAdvertisementById(@PathVariable Long id) {
        ensureAdmin();  // Check if the user has admin privileges
        Advertisement advertisement = advertisementService.getAdvertisementById(id);
        if (advertisement == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Advertisement does not exist");
        }

        // Map to DTO to avoid issues with lazy loading or circular references
        AdvertisementDto advertisementDto = new AdvertisementDto(
                advertisement.getId(),
                advertisement.getTitle(),
                advertisement.getUser().getId(),
                advertisement.getPhoneNumber(),
                advertisement.getGooglePlaceId()
        );

        return ResponseEntity.ok(advertisementDto);
    }

    // Endpoint to create a new advertisement, only accessible by admin
    @PostMapping("/advertisements")
    public ResponseEntity<AdvertisementDto> createAdvertisement(@RequestBody AdvertisementDto advertisementDto) {
        ensureAdmin();  // Check if the user has admin privileges

        // Use the service to create a new advertisement
        Advertisement createdAdvertisement = advertisementService.createAdvertisement(advertisementDto.getTitle(), advertisementDto.getUserId());

        // Map to DTO to return the created advertisement
        AdvertisementDto advertisementDtoResponse = new AdvertisementDto(
                createdAdvertisement.getId(),
                createdAdvertisement.getTitle(),
                createdAdvertisement.getUser().getId(),
                createdAdvertisement.getPhoneNumber(),
                createdAdvertisement.getGooglePlaceId()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(advertisementDtoResponse);
    }

    // Endpoint to update an existing advertisement, only accessible by admin
    @PutMapping("/advertisements/{id}")
    public ResponseEntity<AdvertisementDto> updateAdvertisement(@PathVariable Long id, @RequestBody AdvertisementDto advertisementDto) {
        ensureAdmin();  // Check if the user has admin privileges

        // Use the service to update the advertisement
        Advertisement updatedAdvertisement = advertisementService.updateAdvertisement(id, advertisementDto);

        if (updatedAdvertisement == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Advertisement does not exist");
        }

        // Map to DTO to return the updated advertisement
        AdvertisementDto updatedAdvertisementDto = new AdvertisementDto(
                updatedAdvertisement.getId(),
                updatedAdvertisement.getTitle(),
                updatedAdvertisement.getUser().getId(),
                updatedAdvertisement.getPhoneNumber(),
                updatedAdvertisement.getGooglePlaceId()
        );

        return ResponseEntity.ok(updatedAdvertisementDto);
    }

    // Endpoint to delete an advertisement, only accessible by admin
    @DeleteMapping("/advertisements/{id}")
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long id) {
        ensureAdmin();  // Check if the user has admin privileges

        advertisementService.deleteAdvertisement(id);

        return ResponseEntity.noContent().build();
    }

    // Endpoint to get advertisements by a specific user, only accessible by admin
    @GetMapping("/advertisements/user/{userId}")
    public List<AdvertisementDto> getAdvertisementsByUser(@PathVariable Long userId) {
        ensureAdmin();  // Check if the user has admin privileges
        List<Advertisement> advertisements = advertisementService.getAdvertisementsByUser(userId);

        // Mapping from entity to DTO
        return advertisements.stream()
                .map(ad -> new AdvertisementDto(
                        ad.getId(),
                        ad.getTitle(),
                        ad.getUser().getId(),
                        ad.getPhoneNumber(),
                        ad.getGooglePlaceId()
                ))
                .collect(Collectors.toList());
    }

    // === VEHICLE OPERATIONS ===

    // Endpoint to retrieve a single vehicle by ID, only accessible by admin
    @GetMapping("/vehicles/{id}")
    public VehicleDto getVehicleById(@PathVariable Long id) {
        ensureAdmin();  // Check if the user has admin privileges
        VehicleDto vehicleDto = vehicleService.getVehicleById(id);
        if (vehicleDto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle does not exist");
        }
        return vehicleDto;
    }

    // Endpoint to create a new vehicle, only accessible by admin
    @PostMapping("/vehicles")
    public VehicleDto createVehicle(@RequestBody VehicleDto vehicleDto) {
        ensureAdmin();  // Check if the user has admin privileges
        return vehicleService.createVehicle(vehicleDto);  // Create and return the new vehicle
    }

    // Endpoint to update an existing vehicle, only accessible by admin
    @PutMapping("/vehicles/{id}")
    public VehicleDto updateVehicle(@PathVariable Long id, @RequestBody VehicleDto vehicleDto) {
        ensureAdmin();  // Check if the user has admin privileges
        VehicleDto updatedVehicle = vehicleService.updateVehicle(id, vehicleDto);
        if (updatedVehicle == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle does not exist");
        }
        return updatedVehicle;
    }

    // Endpoint to delete a vehicle, only accessible by admin
    @DeleteMapping("/vehicles/{id}")
    public void deleteVehicle(@PathVariable Long id) {
        ensureAdmin();  // Check if the user has admin privileges
        vehicleService.deleteVehicle(id);  // Delete the vehicle using the service
    }


    // Endpoint to get vehicles by a specific user, only accessible by admin
    @GetMapping("/vehicles/user/{userId}")
    public List<VehicleDto> getVehiclesByUser(@PathVariable Long userId) {
        ensureAdmin();  // Check if the user has admin privileges
        return vehicleService.getVehiclesByUser(userId);  // Fetch and return the user's vehicles
    }

    // === VEHICLE PHOTO OPERATIONS ===

    // Endpoint to retrieve all vehicle photos, only accessible by admin
    @GetMapping("/vehicle-photos")
    public List<VehiclePhotoDto> getAllPhotos() {
        ensureAdmin();  // Check if the user has admin privileges
        return vehiclePhotoService.getAllPhotos();  // Fetch and return all vehicle photos
    }

    // Endpoint to retrieve a single vehicle photo by ID, only accessible by admin
    @GetMapping("/vehicle-photos/{id}")
    public VehiclePhotoDto getPhotoById(@PathVariable Long id) {
        ensureAdmin();  // Check if the user has admin privileges
        VehiclePhotoDto photoDto = vehiclePhotoService.getPhotoById(id);
        if (photoDto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Photo does not exist");
        }
        return photoDto;
    }

    // Endpoint to add a photo to a vehicle, only accessible by admin
    @PostMapping("/vehicle-photos/{vehicleId}")
    public VehiclePhotoDto addPhotoToVehicle(
            @PathVariable Long vehicleId,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("isMain") Boolean isMain) {
        ensureAdmin();  // Check if the user has admin privileges
        try {
            VehiclePhoto photoEntity = vehiclePhotoService.addPhotoToVehicle(vehicleId, photo, isMain, getCurrentUsername());
            return new VehiclePhotoDto(
                    photoEntity.getId(),
                    photoEntity.getPhotoUrl(),
                    photoEntity.getVehicle().getId()
            );
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Endpoint to delete a vehicle photo, only accessible by admin
    @DeleteMapping("/vehicle-photos/{id}")
    public void deletePhoto(@PathVariable Long id) {
        ensureAdmin();  // Check if the user has admin privileges
        vehiclePhotoService.deletePhoto(id);  // Delete the photo using the service
    }

    // === DASHBOARD ===

    // Maps HTTP GET requests to /dashboard
    @GetMapping("/dashboard")
    public AdminPageDto getDashboard(
            @RequestParam(name = "start", required = false) String start, // Optional start date in ISO format
            @RequestParam(name = "end", required = false) String end      // Optional end date in ISO format
    ) {
        // Parse the 'start' parameter if provided, otherwise default to 7 days ago
        LocalDateTime startDateTime = (start != null)
                ? LocalDateTime.parse(start, DateTimeFormatter.ISO_DATE_TIME)
                : LocalDateTime.now().minusDays(7);

        // Parse the 'end' parameter if provided, otherwise default to the current time
        LocalDateTime endDateTime = (end != null)
                ? LocalDateTime.parse(end, DateTimeFormatter.ISO_DATE_TIME)
                : LocalDateTime.now();

        // Call the service method to fetch dashboard statistics for the specified date range
        return adminPageService.getAdminDashboardData(startDateTime, endDateTime);
    }

}
