package com.app.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the user

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Advertisement> advertisements; // List of advertisements associated with the user

    @Column(nullable = false, unique = true)
    private String username; // Username of the user

    @Column(nullable = false, unique = true)
    private String email; // Email of the user

    @Column(nullable = false)
    private String password; // Password of the user

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role; // Role of the user (ADMIN, USER, GUEST)

    @Column(name = "is_enabled", nullable = false)
    private boolean enabled = false; // Default: user account is not active

    // Default constructor required by JPA
    public User() {}

    // Constructor with parameters to create a user
    public User(String username, String email, String password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Enum for user roles (ADMIN, USER, GUEST)
    public enum Role {
        ADMIN, // Administrator role
        USER, // Regular user role
        GUEST // Guest role
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name())); // Grants authorities based on user role
    }

    @Override
    public String getPassword() {
        return password; // Returns the user's password
    }

    @Override
    public String getUsername() {
        return username; // Returns the user's username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Account is not expired
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Account is not locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Credentials are not expired
    }

    @Override
    public boolean isEnabled() {
        return enabled; // Returns whether the account is enabled or not
    }

    // Setter for enabling/disabling the account
    public void setEnabled(boolean enabled) {
        this.enabled = enabled; // Sets the account status to enabled or disabled
    }

    @ElementCollection
    @CollectionTable(name = "user_favorites", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "favourite_advertisements_id")
    private List<Long> favorites = new ArrayList<>(); // List of advertisement IDs that the user has marked as favorites

}