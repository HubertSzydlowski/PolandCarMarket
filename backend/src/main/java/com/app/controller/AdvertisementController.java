package com.app.controller;

import com.app.dto.AdvertisementDto;
import com.app.model.Advertisement;
import com.app.model.User;
import com.app.repository.AdvertisementRepository;
import com.app.repository.UserRepository;
import com.app.service.AdvertisementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Controller for managing advertisements
@RestController
@RequestMapping("/advertisements")
public class AdvertisementController {

    @Autowired
    private AdvertisementService advertisementService;

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private UserRepository userRepository;

    // Returns a paginated list of all advertisements
    @GetMapping
    public Page<AdvertisementDto> getAdvertisements(@RequestParam int page, @RequestParam(defaultValue = "50") int size) {
        size = 50; // Force page size to 50
        Pageable pageRequest = PageRequest.of(page, size);
        Page<Advertisement> advertisementsPage = advertisementService.getAllAdvertisements(pageRequest);

        // Map Advertisement to AdvertisementDto
        return advertisementsPage.map(ad -> {
            AdvertisementDto dto = new AdvertisementDto();
            dto.setId(ad.getId());
            dto.setTitle(ad.getTitle());
            dto.setUserId(ad.getUser().getId());
            dto.setPhoneNumber(ad.getPhoneNumber());
            dto.setGooglePlaceId(ad.getGooglePlaceId());
            return dto;
        });
    }

    // Returns an advertisement by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdvertisementDto> getAdvertisementById(@PathVariable Long id) {
        Advertisement ad = advertisementService.getAdvertisementById(id);
        if (ad == null) {
            return ResponseEntity.notFound().build();
        }

        // ręczne mapowanie encji na DTO:
        AdvertisementDto dto = new AdvertisementDto();
        dto.setId(ad.getId());
        dto.setTitle(ad.getTitle());
        dto.setUserId(ad.getUser().getId());
        dto.setPhoneNumber(ad.getPhoneNumber());
        dto.setGooglePlaceId(ad.getGooglePlaceId());

        return ResponseEntity.ok(dto);
    }

    // Creates a new advertisement
    @PostMapping
    public ResponseEntity<Advertisement> createAdvertisement(@RequestBody AdvertisementDto advertisementDto) {
        Advertisement advertisement = new Advertisement();
        advertisement.setTitle(advertisementDto.getTitle());
        advertisement.setPhoneNumber(advertisementDto.getPhoneNumber());
        advertisement.setGooglePlaceId(advertisementDto.getGooglePlaceId());

        // Find user by ID
        User user = userRepository.findById(advertisementDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set user for the advertisement
        advertisement.setUser(user);

        // Save advertisement
        Advertisement savedAdvertisement = advertisementRepository.save(advertisement);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAdvertisement);
    }

    // Updates an existing advertisement
    @PutMapping("/{id}")
    public Advertisement updateAdvertisement(@PathVariable Long id, @Valid @RequestBody AdvertisementDto advertisementDto) {
        return advertisementService.updateAdvertisement(id, advertisementDto);
    }

    // Deletes an advertisement by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long id) {
        advertisementService.deleteAdvertisement(id);
        return ResponseEntity.noContent().build();
    }
}
