package com.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "advertisements")
@Data
public class Advertisement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the advertisement

    private String title; // Title of the advertisement

    private String phoneNumber; // Phone number for contacting the advertiser

    private String googlePlaceId; // Google Place ID for showing the location on the map

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // Column name user_id for the user relationship
    @JsonIgnore
    private User user; // User associated with the advertisement

    // No-argument constructor required by JPA
    public Advertisement() {}

    // Constructor with arguments for creating objects or testing
    public Advertisement(String title, User user) {
        this.title = title;
        this.user = user;
    }
}
