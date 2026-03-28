package com.app.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "email_tokens")
@Data
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the email token

    private String token; // The email token (verification or reset password)

    private LocalDateTime createdAt; // The time when the token was created

    private LocalDateTime expiresAt; // The expiration time of the token

    @ManyToOne
    private User user; // The user associated with the email token

    @Enumerated(EnumType.STRING)
    private TokenType tokenType; // The type of the token (verification or password reset)

    // Enum for token types (email verification / password reset)
    public enum TokenType {
        VERIFY_EMAIL, // Token type for email verification
        RESET_PASSWORD // Token type for password reset
    }

    // Static method to create a verification token
    public static Email createVerificationToken(User user) {
        String token = UUID.randomUUID().toString();  // Generate unique token
        Email emailToken = new Email();
        emailToken.setToken(token);
        emailToken.setUser(user);
        emailToken.setTokenType(TokenType.VERIFY_EMAIL);
        emailToken.setExpiresAt(LocalDateTime.now().plusHours(24));  // Token expires in 24 hours
        return emailToken;
    }

    // Static method to create a reset password token
    public static Email createResetPasswordToken(User user) {
        Email token = new Email();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());  // Generate unique token
        token.setTokenType(TokenType.RESET_PASSWORD);
        token.setCreatedAt(LocalDateTime.now());
        token.setExpiresAt(LocalDateTime.now().plusHours(24));  // Token expires in 24 hours
        return token;
    }
}