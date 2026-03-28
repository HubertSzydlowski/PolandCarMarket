package com.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Marks this class as a JPA entity, meaning it corresponds to a table in the database
@NoArgsConstructor // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor // Lombok annotation to generate a constructor with all arguments
@Table(name = "vehicle_photos") // Specifies the name of the table in the database that stores vehicle photos
@Data // Lombok annotation that automatically generates getters, setters, toString, equals, and hashCode methods
public class VehiclePhoto {

    @Id // Marks the id field as the primary key of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generates the primary key value using the identity strategy
    private Long id; // Unique identifier for each vehicle photo

    private String photoUrl; // The URL or file path of the photo. This stores the location where the photo is saved (e.g., file path or cloud URL)
    private Boolean isMain; // A flag indicating whether the photo is the main photo for the vehicle. Main photos are typically displayed first in listings

    @ManyToOne // Defines a many-to-one relationship with the Vehicle entity, indicating that many photos can belong to a single vehicle
    @JoinColumn(name = "vehicle_id") // The foreign key column in the vehicle_photos table that links to the vehicles table
    private Vehicle vehicle; // The vehicle to which the photo belongs. Each vehicle can have multiple associated photos

    // Constructor with parameters that accepts the photo URL, associated vehicle, and a flag indicating if the photo is the main photo
    public VehiclePhoto(String photoUrl, Vehicle vehicle, Boolean isMain) {
        this.photoUrl = photoUrl; // Set the URL of the photo
        this.vehicle = vehicle; // Set the associated vehicle
        this.isMain = isMain; // Set whether the photo is the main photo
    }
}