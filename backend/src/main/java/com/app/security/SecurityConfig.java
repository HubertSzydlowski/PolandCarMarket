package com.app.security;

import jakarta.servlet.http.Cookie;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JWTUtility jwtUtility;
    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(JWTUtility jwtUtility, CustomUserDetailsService customUserDetailsService) {
        this.jwtUtility = jwtUtility;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Configuring security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF protection for the entire application
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/users/register").permitAll()  // Allow access to registration endpoint
                        .requestMatchers("/users/login").permitAll()  // Allow access to login endpoint
                        .requestMatchers("/api/auth/**").permitAll()  // Allow access to auth-related API endpoints
                        .requestMatchers("/users/refresh-token").permitAll()  // Allow access to token refresh endpoint
                        .requestMatchers("/api/email/**").permitAll()  // Allow access to email-related API endpoints
                        .requestMatchers("/api/email/verify").permitAll()  // Allow access to email verification endpoint
                        .requestMatchers("/api/email/reset-password-request").permitAll()  // Allow access to password reset request endpoint
                        .requestMatchers("/api/email/reset-password").permitAll()  // Allow access to password reset endpoint\
                        .requestMatchers("/vehicle-photos").permitAll() // Allow basic vehicle photo access
                        .requestMatchers("/vehicle-photos/**").permitAll() // Allow detailed vehicle photo access
                        .requestMatchers("/advertisements/**").permitAll() // Allow access to advertisement endpoints
                        .requestMatchers("/vehicles/**").permitAll() // Allow access to vehicle endpoints
                        .requestMatchers(HttpMethod.GET, "/api/advertisements/**").permitAll() // Public GET access to advertisement API
                        .requestMatchers(HttpMethod.GET, "/api/vehicles/**").permitAll() // Public GET access to vehicle API
                        .requestMatchers(HttpMethod.GET, "/photos/**").permitAll() // Allow access to photo files
                        .requestMatchers(HttpMethod.GET, "/users/**").permitAll() // Allow public read access for user-related GET endpoints
                        .requestMatchers("/admin-page/**").hasRole("ADMIN") // Only admins can access
                        .requestMatchers("/user-page/**").hasRole("USER")   // Only users can access
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()  // Allow access to Swagger UI and API docs without authentication
                        .anyRequest().authenticated()  // All other requests require authentication
                )
                .addFilterBefore(new JWTFilter(jwtUtility, customUserDetailsService), UsernamePasswordAuthenticationFilter.class);
        return http.build();  // Return the configured filter chain
    }

    // Configuring authentication manager
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, UserDetailsService userDetailsService) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }

    // Configuring password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Use BCrypt for encoding passwords
    }

    // Configuring refresh token cookie (can be customized with name and path)
    @Bean
    public Cookie cookie() {
        Cookie cookie = new Cookie("refreshToken", null);  // Create refresh token cookie
        cookie.setHttpOnly(true);  // Mark the cookie as HttpOnly for security
        cookie.setSecure(true);  // Set the cookie to be secure (only sent over HTTPS)
        cookie.setMaxAge(7 * 24 * 60 * 60);  // Set cookie expiration to 7 days
        cookie.setPath("/");  // Make cookie accessible throughout the entire application
        return cookie;  // Return the configured cookie
    }
}