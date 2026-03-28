package com.app.repository;

import com.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query method to find a user by username
    Optional<User> findByUsername(String username);

    // Custom query method to find a user by email
    Optional<User> findByEmail(String email);

    // Count active users
    long countByEnabledTrue();

    // Count users by role
    long countByRole(User.Role role);

    // Count inactive users
    long countByEnabledFalse();

    // Custom query to find users with the most advertisements
    @Query("SELECT u.username FROM User u ORDER BY SIZE(u.advertisements) DESC")
    List<String> findUsersWithMostAdvertisements();

    // Custom query to fetch a User by their ID, including their favorite advertisements
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.favorites WHERE u.id = :id")
    Optional<User> findByIdWithFavorites(@Param("id") Long id);

}
