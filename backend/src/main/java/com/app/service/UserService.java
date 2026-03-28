package com.app.service;

import com.app.dto.UserDto;
import com.app.model.User;
import com.app.model.User.Role;
import com.app.repository.UserRepository;
import com.app.security.JWTUtility;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    private final AuthenticationManager authenticationManager;
    private final JWTUtility jwtUtility;
    private final UserDetailsService userDetailsService;

    @Autowired
    public UserService(AuthenticationManager authenticationManager, JWTUtility jwtUtility, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtility = jwtUtility;
        this.userDetailsService = userDetailsService;
    }

    // User login method to authenticate and generate JWT tokens
    public Map<String, String> login(String username, String password) {
        logger.info("Attempting to authenticate user: {}", username);

        try {
            // Fetch the user from the database
            User user = userRepository.findByUsername(username).orElseThrow(() -> new BadCredentialsException("User not found"));

            // Check if the password matches
            if (!passwordEncoder.matches(password, user.getPassword())) {
                logger.warn("Bad credentials for user: {}", username);
                return null;
            }

            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            if (authentication.isAuthenticated()) {
                logger.info("Authentication successful for user: {}", username);

                // Load user details
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                List<String> roles = userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList());

                // Generate tokens
                String accessToken = jwtUtility.generateAccessToken(username, roles);
                String refreshToken = jwtUtility.generateRefreshToken(username);

                logger.info("Generated JWT tokens for user: {}", username);

                // Return both tokens in a map
                Map<String, String> tokens = new HashMap<>();
                tokens.put("accessToken", accessToken);
                tokens.put("refreshToken", refreshToken);

                return tokens;
            } else {
                logger.warn("Authentication failed for user: {}", username);
                return null;
            }
        } catch (BadCredentialsException ex) {
            logger.error("Bad credentials for user: {}", username, ex);
            return null;
        }
    }

    // Method to get all users as a list of DTOs
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Method to create a new user
    public UserDto createUser(UserDto userDto) {
        // Set role (default to "USER" if not provided)
        Role role = userDto.getRole() != null ? Role.valueOf(userDto.getRole().name()) : Role.USER;

        // Encrypt the password
        String encryptedPassword = passwordEncoder.encode(userDto.getPassword());

        // Convert DTO to User entity
        User user = convertToEntity(userDto, role);
        user.setPassword(encryptedPassword);  // Set encrypted password

        // Save the user to the database
        User savedUser = userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(savedUser);

        // Convert the saved user back to DTO and return it
        return convertToDto(savedUser);
    }

    // Method to get a user by ID
    public UserDto getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(this::convertToDto).orElse(null);
    }

    // Method to update a user's details
    public UserDto updateUser(Long id, UserDto userDto) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setUsername(userDto.getUsername());
            existingUser.setEmail(userDto.getEmail());
            existingUser.setEnabled(userDto.getEnabled());

            // Update password if changed
            if (userDto.getPassword() != null && !userDto.getPassword().isEmpty() && !passwordEncoder.matches(userDto.getPassword(), existingUser.getPassword())) {
                existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
            }

            User updatedUser = userRepository.save(existingUser);
            return convertToDto(updatedUser);
        }
        return null;
    }

    // Method to delete a user by ID
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Method to get all favorite advertisements for a user by their user ID
    public List<Long> getFavorites(Long userId) {
        // Fetch the user by their ID, including the favorites list. If not found, throw an exception.
        User user = userRepository.findByIdWithFavorites(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Return the list of favorite advertisement IDs
        return user.getFavorites();
    }

    // Method to add an advertisement to the user's list of favorites
    public void addToFavorites(Long userId, Long advertisementId) {
        // Fetch the user by their ID, including the favorites list. If not found, throw an exception.
        User user = userRepository.findByIdWithFavorites(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Check if the advertisement is not already in the user's favorites list
        if (!user.getFavorites().contains(advertisementId)) {
            // Add the advertisement ID to the favorites list
            user.getFavorites().add(advertisementId);

            // Save the updated user entity with the new favorite advertisement
            userRepository.save(user);
        }
    }

    // Method to remove an advertisement from the user's list of favorites
    public void removeFromFavorites(Long userId, Long advertisementId) {
        // Fetch the user by their ID, including the favorites list. If not found, throw an exception.
        User user = userRepository.findByIdWithFavorites(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Check if the advertisement is in the user's favorites list
        if (user.getFavorites().contains(advertisementId)) {
            // Remove the advertisement ID from the favorites list
            user.getFavorites().remove(advertisementId);

            // Save the updated user entity after removing the favorite advertisement
            userRepository.save(user);
        }
    }

    // Helper method to convert User entity to UserDto
    private UserDto convertToDto(User user) {
        UserDto.Role role = UserDto.Role.valueOf(user.getRole().name());
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), role, user.isEnabled());
    }

    // Helper method to convert UserDto to User entity
    public User convertToEntity(UserDto userDto, Role role) {
        User user = new User(userDto.getUsername(), userDto.getEmail(), userDto.getPassword(), role);
        user.setEnabled(userDto.getEnabled());
        return user;
    }

    // Method to refresh access token using refresh token
    public String refreshAccessToken(String refreshToken) {
        return jwtUtility.refreshAccessToken(refreshToken);
    }
}