package com.app.repository;

import com.app.model.User;
import com.app.model.UserPage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserPageRepository extends JpaRepository<UserPage, Long> {

    // Custom query method to find all user stats based on the User object
    Optional<UserPage> findByUser(User user);

    // Custom method to save user statistics
    UserPage save(UserPage userPage);
}
