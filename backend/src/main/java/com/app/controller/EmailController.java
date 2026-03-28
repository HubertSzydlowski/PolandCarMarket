package com.app.controller;

import com.app.dto.EmailDto;
import com.app.model.User;
import com.app.repository.UserRepository;
import com.app.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Controller for handling email-related operations
@RestController
@RequestMapping("/api/email")
public class EmailController {

    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);

    private final EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    // Endpoint for email verification
    @GetMapping("/verify")
    public String verifyEmail(@RequestParam String token) {
        logger.info("Starting email verification with token: {}", token);
        boolean result = emailService.verifyEmail(token);

        if (result) {
            logger.info("Email verified successfully.");
            return "Email verified successfully! You can now log in.";
        } else {
            logger.warn("Email verification failed. Invalid token.");
            return "Invalid token!";
        }
    }

    // Endpoint for sending a password reset link
    @PostMapping("/reset-password-request")
    public String resetPasswordRequest(@RequestBody EmailDto emailDto) {
        logger.info("Starting to send reset password link for email: {}", emailDto.getEmail());

        // Find user by email
        User user = userRepository.findByEmail(emailDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Send reset password email
        emailService.sendResetPasswordEmail(user);
        return "Password reset link has been sent to your email.";
    }

    // Endpoint for resetting password using the provided token
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody EmailDto emailDto) {
        logger.info("Starting password reset for token: {}", emailDto.getToken());
        boolean result = emailService.resetPassword(emailDto);

        if (result) {
            logger.info("Password was successfully changed.");
            return "Password has been changed!";
        } else {
            logger.warn("Password reset failed. Invalid token.");
            return "Invalid token!";
        }
    }
}