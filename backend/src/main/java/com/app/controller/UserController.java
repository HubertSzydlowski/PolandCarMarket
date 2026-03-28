package com.app.controller;

import com.app.dto.UserDto;
import com.app.repository.UserRepository;
import com.app.service.EmailService;
import com.app.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// Controller for handling user-related operations
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // Returns a list of all users
    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    // Creates a new user
    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        UserDto createdUser = userService.createUser(userDto);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // Returns a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto userDto = userService.getUserById(id);
        if (userDto != null) {
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Updates a user by ID
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(id, userDto);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Deletes a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to get the list of favorite advertisements for a specific user
    @GetMapping("/{userId}/favorites")
    public ResponseEntity<List<Long>> getFavorites(@PathVariable Long userId) {
        List<Long> favorites = userService.getFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    // Endpoint to add a specific advertisement to the user's list of favorites
    @PostMapping("/{userId}/favorites/{advertisementId}")
    public ResponseEntity<String> addToFavorites(
            @PathVariable Long userId,
            @PathVariable Long advertisementId) {
        userService.addToFavorites(userId, advertisementId);
        return ResponseEntity.ok("Advertisement added to favorites");
    }

    // Endpoint to remove a specific advertisement from the user's list of favorites
    @DeleteMapping("/{userId}/favorites/{advertisementId}")
    public ResponseEntity<String> removeFromFavorites(
            @PathVariable Long userId,
            @PathVariable Long advertisementId) {
        userService.removeFromFavorites(userId, advertisementId);
        return ResponseEntity.ok("Advertisement removed from favorites");
    }

    // Authenticates a user and generates JWT tokens
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserDto userDto, HttpServletResponse response) {
        Map<String, String> tokens = userService.login(userDto.getUsername(), userDto.getPassword());

        if (tokens != null) {
            // Get refresh token from returned tokens
            String refreshToken = tokens.get("refreshToken");

            // Create an HTTP-only secure cookie for the refresh token
            Cookie cookie = new Cookie("refreshToken", refreshToken);
            cookie.setHttpOnly(true); // Prevent access from JavaScript
            cookie.setSecure(true); // Should be true in production (HTTPS)
            cookie.setPath("/"); // Cookie accessible throughout the application
            cookie.setMaxAge(7 * 24 * 60 * 60); // Lifetime: 7 days

            // Add cookie to the response
            response.addCookie(cookie);

            return ResponseEntity.ok(tokens); // Return access and refresh tokens
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Login failed
        }
    }

    // Refreshes access token using refresh token stored in cookie
    @PostMapping("/refresh-token")
    public ResponseEntity<String> refreshToken(@CookieValue(name = "refreshToken") String refreshToken) {
        if (refreshToken == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Missing refresh token
        }

        String newAccessToken = userService.refreshAccessToken(refreshToken);
        if (newAccessToken == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Refresh token expired or invalid
        }

        return ResponseEntity.ok(newAccessToken); // Return new access token
    }

    // Endpoint for logging out
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        // Remove the refreshToken cookie
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true); // Prevent access from JavaScript
        cookie.setSecure(true); // Secure setting for HTTPS
        cookie.setPath("/"); // Cookie available throughout the application
        cookie.setMaxAge(0); // Set age to 0 to immediately remove the cookie

        // Remove the cookie from the response
        response.addCookie(cookie);

        return new ResponseEntity<>(HttpStatus.OK); // Confirm successful logout
    }

}