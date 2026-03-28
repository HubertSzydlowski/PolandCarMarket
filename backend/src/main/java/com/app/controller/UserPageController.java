package com.app.controller;

import com.app.dto.AdvertisementDto;
import com.app.dto.UserPageDto;
import com.app.dto.VehicleDto;
import com.app.dto.VehiclePhotoDto;
import com.app.model.Advertisement;
import com.app.model.User;
import com.app.model.VehiclePhoto;
import com.app.security.JWTUtility;
import com.app.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user-page")
public class UserPageController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private AdvertisementService advertisementService;

    @Autowired
    private VehiclePhotoService vehiclePhotoService;

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private UserPageService userPageService;

    @Autowired
    private UserService userService;

    // Retrieve all advertisements of the logged-in user with pagination
    @GetMapping("/advertisements")
    public Page<AdvertisementDto> getUserAdvertisements(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "50") int size) {
        User currentUser = jwtUtility.getCurrentUser();
        Pageable pageable = PageRequest.of(page, size);
        List<Advertisement> userAds = advertisementService.getAdvertisementsByUser(currentUser.getId());
        List<AdvertisementDto> dtos = userAds.stream()
                .map(ad -> new AdvertisementDto(
                        ad.getId(),
                        ad.getTitle(),
                        ad.getUser().getId(),
                        ad.getPhoneNumber(),
                        ad.getGooglePlaceId()
                ))
                .collect(Collectors.toList());
        // Manually create a Page object from the list
        return new org.springframework.data.domain.PageImpl<>(dtos, pageable, dtos.size());
    }

    // Retrieve a specific advertisement by ID for the logged-in user
    @GetMapping("/advertisements/{id}")
    public ResponseEntity<AdvertisementDto> getUserAdvertisementById(@PathVariable Long id) {
        User currentUser = jwtUtility.getCurrentUser();
        Advertisement ad = advertisementService.getAdvertisementById(id);

        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Forbidden access or advertisement not found
        }

        AdvertisementDto dto = new AdvertisementDto(
                ad.getId(),
                ad.getTitle(),
                ad.getUser().getId(),
                ad.getPhoneNumber(),
                ad.getGooglePlaceId()
        );
        return ResponseEntity.ok(dto);
    }

    // Create a new advertisement for the logged-in user
    @PostMapping("/advertisements")
    public ResponseEntity<AdvertisementDto> createUserAdvertisement(@Valid @RequestBody AdvertisementDto advertisementDto) {
        User currentUser = jwtUtility.getCurrentUser(); // działa poprawnie
        Advertisement newAd = advertisementService.createAdvertisement(advertisementDto.getTitle(), currentUser.getId());

        AdvertisementDto dto = new AdvertisementDto(
                newAd.getId(),
                newAd.getTitle(),
                newAd.getUser().getId(),
                newAd.getPhoneNumber(),
                newAd.getGooglePlaceId()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    // Update a user's advertisement by ID
    @PutMapping("/advertisements/{id}")
    public ResponseEntity<AdvertisementDto> updateUserAdvertisement(
            @PathVariable Long id,
            @Valid @RequestBody AdvertisementDto advertisementDto) {

        User currentUser = jwtUtility.getCurrentUser();
        Advertisement ad = advertisementService.getAdvertisementById(id);

        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        advertisementDto.setUserId(currentUser.getId());
        Advertisement updatedAd = advertisementService.updateAdvertisement(id, advertisementDto);

        AdvertisementDto dto = new AdvertisementDto(
                updatedAd.getId(),
                updatedAd.getTitle(),
                updatedAd.getUser().getId(),
                updatedAd.getPhoneNumber(),
                updatedAd.getGooglePlaceId()
        );
        return ResponseEntity.ok(dto);
    }

    // Delete a user's advertisement by ID
    @DeleteMapping("/advertisements/{id}")
    public ResponseEntity<Void> deleteUserAdvertisement(@PathVariable Long id) {
        User currentUser = jwtUtility.getCurrentUser();
        Advertisement ad = advertisementService.getAdvertisementById(id);

        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        advertisementService.deleteAdvertisement(id);
        return ResponseEntity.noContent().build();
    }

    // Retrieve all vehicles related to the logged-in user's advertisements
    @GetMapping("/vehicles")
    public List<VehicleDto> getUserVehicles() {
        User currentUser = jwtUtility.getCurrentUser();
        return vehicleService.getVehiclesByUser(currentUser.getId());
    }

    // Retrieve a specific vehicle by ID, ensuring the logged-in user is the owner of the advertisement
    @GetMapping("/vehicles/{id}")
    public ResponseEntity<VehicleDto> getUserVehicleById(@PathVariable Long id) {
        User currentUser = jwtUtility.getCurrentUser();
        VehicleDto vehicleDto = vehicleService.getVehicleById(id);

        if (vehicleDto == null) {
            return ResponseEntity.notFound().build();
        }

        Advertisement ad = advertisementService.getAdvertisementById(vehicleDto.getAdvertisementId());
        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(vehicleDto);
    }

    // Add a new vehicle for an advertisement belonging to the logged-in user
    @PostMapping("/vehicles")
    public ResponseEntity<VehicleDto> createUserVehicle(@Valid @RequestBody VehicleDto vehicleDto) {
        User currentUser = jwtUtility.getCurrentUser();

        Advertisement ad = advertisementService.getAdvertisementById(vehicleDto.getAdvertisementId());
        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        VehicleDto createdVehicle = vehicleService.createVehicle(vehicleDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVehicle);
    }

    // Update a user's vehicle by ID
    @PutMapping("/vehicles/{id}")
    public ResponseEntity<VehicleDto> updateUserVehicle(@PathVariable Long id, @Valid @RequestBody VehicleDto vehicleDto) {
        User currentUser = jwtUtility.getCurrentUser();

        Advertisement ad = advertisementService.getAdvertisementById(vehicleDto.getAdvertisementId());
        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        VehicleDto updatedVehicle = vehicleService.updateVehicle(id, vehicleDto);
        return ResponseEntity.ok(updatedVehicle);
    }

    // Delete a user's vehicle by ID
    @DeleteMapping("/vehicles/{id}")
    public ResponseEntity<Void> deleteUserVehicle(@PathVariable Long id) {
        User currentUser = jwtUtility.getCurrentUser();

        VehicleDto vehicleDto = vehicleService.getVehicleById(id);
        if (vehicleDto == null) {
            return ResponseEntity.notFound().build();
        }

        Advertisement ad = advertisementService.getAdvertisementById(vehicleDto.getAdvertisementId());
        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }

    // Upload a photo for a vehicle belonging to the logged-in user
    @PostMapping("/vehicles/{vehicleId}/photos")
    public ResponseEntity<VehiclePhotoDto> uploadPhotoToVehicle(
            @PathVariable Long vehicleId,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam(value = "isMain", defaultValue = "false") Boolean isMain) {

        User currentUser = jwtUtility.getCurrentUser();
        VehicleDto vehicleDto = vehicleService.getVehicleById(vehicleId);

        if (vehicleDto == null) {
            return ResponseEntity.notFound().build();
        }

        Advertisement ad = advertisementService.getAdvertisementById(vehicleDto.getAdvertisementId());
        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            VehiclePhoto savedPhoto = vehiclePhotoService.addPhotoToVehicle(vehicleId, photo, isMain, currentUser.getUsername());
            VehiclePhotoDto photoDto = new VehiclePhotoDto(savedPhoto.getId(), savedPhoto.getPhotoUrl(), savedPhoto.getVehicle().getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(photoDto);
        } catch (RuntimeException | IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Retrieve all photos of a specific vehicle belonging to the logged-in user
    @GetMapping("/vehicles/{vehicleId}/photos")
    public ResponseEntity<List<VehiclePhotoDto>> getVehiclePhotos(@PathVariable Long vehicleId) {
        User currentUser = jwtUtility.getCurrentUser();
        VehicleDto vehicleDto = vehicleService.getVehicleById(vehicleId);

        if (vehicleDto == null) {
            return ResponseEntity.notFound().build();
        }

        Advertisement ad = advertisementService.getAdvertisementById(vehicleDto.getAdvertisementId());
        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<VehiclePhotoDto> photos = vehiclePhotoService.getAllPhotos().stream()
                .filter(p -> p.getVehicleId().equals(vehicleId))
                .collect(Collectors.toList());

        return ResponseEntity.ok(photos);
    }

    // Delete a photo of a user's vehicle
    @DeleteMapping("/photos/{photoId}")
    public ResponseEntity<Void> deleteVehiclePhoto(@PathVariable Long photoId) {
        User currentUser = jwtUtility.getCurrentUser();
        VehiclePhotoDto photoDto = vehiclePhotoService.getPhotoById(photoId);

        if (photoDto == null) {
            return ResponseEntity.notFound().build();
        }

        VehicleDto vehicleDto = vehicleService.getVehicleById(photoDto.getVehicleId());
        Advertisement ad = advertisementService.getAdvertisementById(vehicleDto.getAdvertisementId());

        if (ad == null || !ad.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        vehiclePhotoService.deletePhoto(photoId);
        return ResponseEntity.noContent().build();
    }

    // Retrieve all photos of vehicles belonging to the logged-in user
    @GetMapping("/photos")
    public ResponseEntity<List<VehiclePhotoDto>> getAllUserPhotos() {
        User currentUser = jwtUtility.getCurrentUser();

        List<VehiclePhotoDto> allPhotos = vehiclePhotoService.getAllPhotos();

        List<VehiclePhotoDto> userPhotos = allPhotos.stream()
                .filter(photoDto -> {
                    VehicleDto vehicleDto = vehicleService.getVehicleById(photoDto.getVehicleId());
                    if (vehicleDto == null) return false;
                    Advertisement ad = advertisementService.getAdvertisementById(vehicleDto.getAdvertisementId());
                    return ad != null && ad.getUser().getId().equals(currentUser.getId());
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(userPhotos);
    }

    // Endpoint to get the list of favorite advertisements for the currently logged-in user
    @GetMapping("/favorites")
    public ResponseEntity<List<Long>> getFavorites() {
        User currentUser = jwtUtility.getCurrentUser();
        List<Long> favorites = userService.getFavorites(currentUser.getId());
        return ResponseEntity.ok(favorites);
    }

    // Endpoint to add an advertisement to the favorites list of the currently logged-in user
    @PostMapping("/favorites/{advertisementId}")
    public ResponseEntity<String> addToFavorites(@PathVariable Long advertisementId) {
        User currentUser = jwtUtility.getCurrentUser();
        userService.addToFavorites(currentUser.getId(), advertisementId);
        return ResponseEntity.ok("Advertisement added to favorites");
    }

    // Endpoint to remove an advertisement from the favorites list of the currently logged-in user
    @DeleteMapping("/favorites/{advertisementId}")
    public ResponseEntity<String> removeFromFavorites(@PathVariable Long advertisementId) {
        User currentUser = jwtUtility.getCurrentUser();
        userService.removeFromFavorites(currentUser.getId(), advertisementId);
        return ResponseEntity.ok("Advertisement removed from favorites");
    }

    // Endpoint to retrieve the dashboard statistics for the current logged-in user
    @GetMapping("/dashboard")
    public UserPageDto getUserDashboard() {
        // Call the userPageService to get statistics for the current user
        return userPageService.getUserStats();
    }
}
