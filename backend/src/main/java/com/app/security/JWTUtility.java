package com.app.security;

import com.app.model.User;
import com.app.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class JWTUtility {

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String secretKey;  // Secret key for signing JWT tokens

    private static final Logger logger = LoggerFactory.getLogger(JWTUtility.class);  // Logger initialization

    // Default expiration times for tokens
    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 1000L * 60 * 60; // 60 minutes
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 1000L * 60 * 60 * 24 * 7; // 7 days

    // Generate Access Token
    public String generateAccessToken(String username, List<String> roles) {
        return Jwts.builder()
                .setSubject(username)  // Set the subject (username)
                .claim("roles", roles) // Add roles as claim
                .setIssuedAt(new Date())  // Set issued date
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))  // Set expiration date
                .signWith(SignatureAlgorithm.HS256, secretKey)  // Sign the token with HS256 algorithm and secret key
                .compact();  // Return the compact token
    }

    // Generate Refresh Token
    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)  // Set the subject (username)
                .setIssuedAt(new Date())  // Set issued date
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))  // Set expiration date
                .signWith(SignatureAlgorithm.HS256, secretKey)  // Sign the token with HS256 algorithm and secret key
                .compact();  // Return the compact token
    }

    // Refresh Access Token using a valid Refresh Token
    public String refreshAccessToken(String refreshToken) {
        if (isTokenExpired(refreshToken)) {
            return null; // Refresh Token is expired
        }

        String username = extractUsername(refreshToken);  // Extract username from Refresh Token
        List<String> roles = extractRoles(refreshToken);  // Extract roles from Refresh Token

        return generateAccessToken(username, roles);  // Generate a new Access Token
    }

    // Extract claims from the token
    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)  // Set the signing key
                .parseClaimsJws(token)  // Parse the token
                .getBody();  // Return the claims from the token
    }

    // Check if the token is expired
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());  // Return true if the token is expired
    }

    // Validate the token
    public boolean validateToken(String token) {
        try {
            Claims claims = extractClaims(token);  // Extract claims
            Date expirationDate = claims.getExpiration();  // Get expiration date
            return !expirationDate.before(new Date());  // Token is valid if expiration date is in the future
        } catch (JwtException | IllegalArgumentException e) {
            return false;  // Return false if there is an exception (invalid token)
        }
    }

    // Extract the username from the token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();  // Return the subject (username) from claims
    }

    // Extracts the roles from the JWT token, returns an empty list if not found
    public List<String> extractRoles(String token) {
        List<String> roles = (List<String>) extractClaims(token).get("roles");
        if (roles == null) {
            return new ArrayList<>();  // Return empty list if roles are null
        }
        return roles;  // Return roles
    }

    // Retrieves the currently authenticated user from the SecurityContext
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No authentication found");  // Throws exception if no authentication is present
        }

        logger.info("Authentication name: {}", authentication.getName());
        logger.info("Authorities: {}", authentication.getAuthorities());

        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));  // Fetch user by username
    }

}