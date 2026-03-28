package com.app.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncryptor {

    // Create an instance of BCryptPasswordEncoder, which provides methods for password encoding and matching
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Method to encrypt a plain text password
    public static String encryptPassword(String plainPassword) {
        // Uses BCrypt to encode the plain password and returns the encoded version
        return encoder.encode(plainPassword);
    }

    // Method to check if a plain password matches an encoded password
    public static boolean checkPassword(String plainPassword, String encodedPassword) {
        // Uses BCrypt to compare the plain password with the encoded password
        return encoder.matches(plainPassword, encodedPassword);
    }
}
