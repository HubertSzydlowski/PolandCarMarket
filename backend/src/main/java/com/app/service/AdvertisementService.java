package com.app.service;

import com.app.dto.AdvertisementDto;
import com.app.model.Advertisement;
import com.app.model.User;
import com.app.repository.AdvertisementRepository;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdvertisementService {

    @Autowired
    private AdvertisementRepository advertisementRepository; // Injected AdvertisementRepository for interacting with Advertisement data

    @Autowired
    private UserRepository userRepository; // Injected UserRepository for accessing User data

    // Method to retrieve all advertisements with pagination
    public Page<Advertisement> getAllAdvertisements(Pageable pageable) {
        return advertisementRepository.findAll(pageable); // Returns a page of advertisements
    }

    // Method to retrieve an advertisement by its ID
    public Advertisement getAdvertisementById(Long id) {
        return advertisementRepository.findById(id).orElse(null); // Returns the advertisement if found, otherwise returns null
    }

    // Method to create a new advertisement
    public Advertisement createAdvertisement(String title, Long userId) {
        // Fetch the User by userId and throw an exception if not found
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create a new Advertisement instance and set its properties
        Advertisement advertisement = new Advertisement();
        advertisement.setTitle(title); // Set the title of the advertisement
        advertisement.setUser(user); // Set the associated user for the advertisement

        // Save the new advertisement to the database
        return advertisementRepository.save(advertisement);
    }

    // Method to update an existing advertisement
    public Advertisement updateAdvertisement(Long id, AdvertisementDto advertisementDto) {
        // Retrieve the existing advertisement by ID, or throw an exception if not found
        Advertisement existingAdvertisement = advertisementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Advertisement not found"));

        // Update the existing advertisement's properties with data from the AdvertisementDto
        existingAdvertisement.setTitle(advertisementDto.getTitle()); // Update the title
        existingAdvertisement.setPhoneNumber(advertisementDto.getPhoneNumber()); // Update the phone number
        existingAdvertisement.setGooglePlaceId(advertisementDto.getGooglePlaceId()); // Update the place ID

        // Fetch the User by ID from the DTO and update the user associated with the advertisement
        User user = userRepository.findById(advertisementDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        existingAdvertisement.setUser(user); // Set the updated user for the advertisement

        // Save the updated advertisement to the database
        return advertisementRepository.save(existingAdvertisement);
    }

    // Method to delete an advertisement by its ID
    public void deleteAdvertisement(Long id) {
        advertisementRepository.deleteById(id); // Deletes the advertisement with the given ID from the database
    }

    // Method to get advertisements associated with a specific user
    public List<Advertisement> getAdvertisementsByUser(Long userId) {
        return advertisementRepository.findByUserId(userId); // Finds all advertisements by the user ID
    }
}
