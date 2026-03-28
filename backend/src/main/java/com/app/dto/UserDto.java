package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// DTO for user-related data
@Data
@AllArgsConstructor
public class UserDto {

    private Long id; // Unique identifier for the user

    @NotBlank(message = "Username is mandatory") // Username must not be blank
    @Size(min = 3, max = 40, message = "Username must be between 3 and 40 characters") // Username length constraints
    private String username;

    @NotBlank(message = "Email is mandatory") // Email must not be blank
    @Email(message = "Email should be valid") // Email must follow a valid format
    private String email;

    @NotBlank(message = "Password is mandatory") // Password must not be blank
    @Size(min = 6, message = "Password should be at least 6 characters") // Password minimum length
    private String password;

    private Role role; // User role

    private Boolean enabled = false; // nowy użytkownik domyślnie nieaktywny

    // Constructor for creating UserDto with id, username, email, role and enabled
    public UserDto(Long id, String username, String email, Role role, Boolean enabled) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.enabled = enabled;
    }

    // Default constructor
    public UserDto() {}

    // Enum for user roles
    public enum Role {
        ADMIN,
        USER,
        GUEST
    }
}
