package com.app.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

// DTO for advertisements
@Data
@AllArgsConstructor
public class AdvertisementDto {

    private Long id; // Advertisement ID

    @NotBlank(message = "Title is mandatory") // Title cannot be blank
    @Size(min = 10, max = 100, message = "Title must be between 10 and 100 characters") // Title length constraints
    private String title;

    private Long userId; // ID of the user who created the advertisement

    private String phoneNumber; // Phone number for contact

    private String googlePlaceId; // Google Place ID for map location

    @JsonCreator
    public AdvertisementDto(
            @JsonProperty("title") String title
    ) {
        this.title = title;
    }

    // Default constructor
    public AdvertisementDto() {}
}
