package com.app.dto;

import lombok.Data;

// DTO for handling email-related data
@Data
public class EmailDto {

    private String token; // Token used for verification or password reset
    private String newPassword; // New password provided by the user
    private String email; // Email address of the user
}
