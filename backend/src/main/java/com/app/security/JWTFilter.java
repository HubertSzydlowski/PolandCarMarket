package com.app.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtility jwtUtility;
    private static final Logger logger = LoggerFactory.getLogger(JWTFilter.class);

    private final CustomUserDetailsService userDetailsService;

    @Autowired
    public JWTFilter(JWTUtility jwtUtility, CustomUserDetailsService userDetailsService) {
        this.jwtUtility = jwtUtility;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Skip token validation for registration, login, and refresh-token endpoints
        if (request.getRequestURI().equals("/users/register") || request.getRequestURI().equals("/users/login") || request.getRequestURI().equals("/users/refresh-token")) {
            logger.info("Skipping token validation for URI: {}", request.getRequestURI());  // Log the skipped endpoint
            filterChain.doFilter(request, response);  // Continue with the filter chain
            return;
        }

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract and validate the Access Token
        String token = extractToken(request);
        logger.info("Extracted token: {}", token);  // Log the extracted token

        if (token != null && jwtUtility.validateToken(token)) {
            String username = jwtUtility.extractUsername(token);
            logger.info("Username extracted: {}", username);  // Log the extracted username

            // Extract roles from the token
            List<String> roles = jwtUtility.extractRoles(token);
            logger.info("Roles extracted: {}", roles);  // Log the extracted roles

            List<SimpleGrantedAuthority> authorities = roles.stream()
                    .map(role -> new SimpleGrantedAuthority(role))  // Convert roles to authorities
                    .collect(Collectors.toList());

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            logger.info("Authorities set: {}",
                    SecurityContextHolder.getContext().getAuthentication().getAuthorities());

        } else {
            logger.warn("Token is either null or invalid");  // Log warning if token is invalid or missing
        }

        // Extract and validate the Refresh Token
        String refreshToken = extractRefreshToken(request);
        if (refreshToken != null && jwtUtility.validateToken(refreshToken)) {
            String newAccessToken = jwtUtility.refreshAccessToken(refreshToken);
            if (newAccessToken != null) {
                logger.info("New access token generated: {}", newAccessToken);  // Log the new access token

                // Set response with new access token for refresh-token endpoint
                if (request.getRequestURI().equals("/users/refresh-token")) {
                    response.setContentType("application/json");
                    response.getWriter().write("{\"accessToken\": \"Bearer " + newAccessToken + "\"}");  // Return new access token in response

                    // After refreshing the token, set user in security context
                    String username = jwtUtility.extractUsername(newAccessToken);
                    List<String> roles = jwtUtility.extractRoles(newAccessToken);

                    List<SimpleGrantedAuthority> authorities = roles.stream()
                            .map(role -> new SimpleGrantedAuthority(role))  // Convert roles to authorities
                            .collect(Collectors.toList());

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                    logger.info("Authorities set: {}",
                            SecurityContextHolder.getContext().getAuthentication().getAuthorities());


                    return;  // Stop further processing after token refresh
                }
            }
        }

        filterChain.doFilter(request, response);  // Continue with the filter chain
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);  // Extract the token from Authorization header
        }
        return null;
    }

    private String extractRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                logger.info("Found cookie: {} = {}", cookie.getName(), cookie.getValue());  // Log cookie details
                if ("refreshToken".equals(cookie.getName())) {
                    return cookie.getValue();  // Return the refresh token if found in cookies
                }
            }
        }
        logger.warn("Refresh token not found in cookies");  // Log warning if refresh token is not found
        return null;
    }
}